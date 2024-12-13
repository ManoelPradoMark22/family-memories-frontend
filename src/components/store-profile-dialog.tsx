import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { getProfile, IGetProfileResponse } from '@/api/get-profile'
import { updateProfile } from '@/api/update-profile'
import { queryClient } from '@/lib/react-query'
import { QUERY_KEYS } from '@/utils/constants'
import { ILoggedUserIdCache } from '@/utils/types'

import { Button } from './ui/button'
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { Input } from './ui/input'
import { Label } from './ui/label'

const { GET_PROFILE_KEY, GET_USER_ID_LOGGED_IN } = QUERY_KEYS

const storeProfileSchema = z.object({
  name: z.string().min(1),
})

type IStoreProfileSchema = z.infer<typeof storeProfileSchema>

type IStoreProfileDialog = {
  onClose: () => void
}

export function StoreProfileDialog({ onClose }: IStoreProfileDialog) {
  const loggedUserId: ILoggedUserIdCache = queryClient.getQueryData(
    GET_USER_ID_LOGGED_IN,
  )

  const queryFnToUse = loggedUserId?.userId
    ? { queryFn: () => getProfile(loggedUserId.userId) }
    : {}

  const { data: profile } = useQuery({
    queryKey: GET_PROFILE_KEY,
    staleTime: Infinity,
    ...queryFnToUse,
    enabled: !!loggedUserId?.userId,
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<IStoreProfileSchema>({
    resolver: zodResolver(storeProfileSchema),
    values: {
      name: profile?.name ?? '',
    },
  })

  type IUpdateProfileCacheReturn = {
    previousProfile?: IGetProfileResponse
  }

  function updateProfileCache({
    name,
  }: IStoreProfileSchema): IUpdateProfileCacheReturn {
    const oldCached =
      queryClient.getQueryData<IGetProfileResponse>(GET_PROFILE_KEY)

    if (oldCached) {
      queryClient.setQueryData<IGetProfileResponse>(GET_PROFILE_KEY, {
        ...oldCached,
        name,
      })
    }

    return { previousProfile: oldCached }
  }

  const { mutateAsync } = useMutation({
    mutationFn: updateProfile,
    onMutate: ({ body }) => {
      const { previousProfile } = updateProfileCache({
        name: body.name,
      })

      return { previousProfile }
    },
    onError: (_error, __variables, context) => {
      if (context?.previousProfile) {
        updateProfileCache(context.previousProfile)
      }
    },
  })

  async function handleUpdateProfile(data: IStoreProfileSchema) {
    if (!loggedUserId?.userId) {
      return
    }

    try {
      toast.loading('Updating profile')

      onClose()

      await mutateAsync({
        body: { name: data.name },
        id: loggedUserId.userId,
      })

      toast.dismiss()
      toast.success('Profile successfully updated!')
    } catch (e) {
      toast.dismiss()
      toast.error('Error updating profile, please try again.')
    }
  }

  return (
    <DialogContent onCloseAutoFocus={() => reset()}>
      <DialogHeader>
        <DialogTitle>Profile</DialogTitle>
        <DialogDescription>
          Update the information visible to your friends
        </DialogDescription>
      </DialogHeader>

      <form action="" onSubmit={handleSubmit(handleUpdateProfile)}>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right" htmlFor="name">
              Name
            </Label>
            <Input className="col-span-3" id="name" {...register('name')} />
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              disabled={isSubmitting}
              variant="ghost"
              onClick={() => reset()}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={isSubmitting || !isDirty}
            variant="success"
          >
            Save
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  )
}
