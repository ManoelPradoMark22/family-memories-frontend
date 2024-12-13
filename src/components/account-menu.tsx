import { useQuery } from '@tanstack/react-query'
import { Building, ChevronDown, LogOut } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { getProfile } from '@/api/get-profile'
import { QUERY_KEYS } from '@/utils/constants'

import { StoreProfileDialog } from './store-profile-dialog'
import { Button } from './ui/button'
import { Dialog, DialogTrigger } from './ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import { Skeleton } from './ui/skeleton'
import { queryClient } from '@/lib/react-query'
import { ILoggedUserIdCache } from '@/utils/types'

const { GET_PROFILE_KEY, GET_USER_ID_LOGGED_IN } = QUERY_KEYS

export function AccountMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const navigate = useNavigate()

  const loggedUserId: ILoggedUserIdCache = queryClient.getQueryData(GET_USER_ID_LOGGED_IN)

  const queryFnToUse = loggedUserId?.userId
    ? { queryFn: () => getProfile(loggedUserId.userId) }
    : {}

  const { data: profile, isLoading: isLoadingProfile } = useQuery({
    queryKey: GET_PROFILE_KEY,
    staleTime: Infinity,
    ...queryFnToUse,
    enabled: !!loggedUserId?.userId
  })

  const signOutFn = () => {
    queryClient.clear();
    navigate('/sign-in', { replace: true });
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex select-none items-center gap-2"
            data-testid="account-menu-btn"
          >
            {isLoadingProfile ? (
              <Skeleton className="h-4 w-40" />
            ) : (
              profile?.name
            )}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex flex-col">
            {isLoadingProfile ? (
              <div className="space-y-1.5">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            ) : (
              <>
                <span className="text-xs font-normal text-muted-foreground">
                  {profile?.email}
                </span>
              </>
            )}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DialogTrigger
            asChild
            disabled={isLoadingProfile}
            data-testid="update-profile-btn"
          >
            <DropdownMenuItem>
              <Building className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            asChild
            className="text-rose-500 dark:text-rose-400"
          >
            <button onClick={() => signOutFn()} className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Sign Out</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <StoreProfileDialog onClose={handleClose} />
    </Dialog>
  )
}
