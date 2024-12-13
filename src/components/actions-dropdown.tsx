import { MoreVertical } from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

type IActions = {
  label: string
  handleFuntion: () => void
  icon?: JSX.Element
}

type IActionsDropdown = {
  actions?: IActions[]
  isAbsolute?: boolean
  isAlwaysVisible?: boolean
}

const ActionsDropdown = ({
  actions,
  isAbsolute,
  isAlwaysVisible,
}: IActionsDropdown) => {
  return (
    <div title="Actions">
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          className={`${
            isAbsolute
              ? `${isAlwaysVisible ? '' : 'md:opacity-0'} actions-dropdown duration-400 absolute right-0 top-0 h-6 w-6 cursor-pointer rounded-full bg-white bg-opacity-75 p-1 text-gray-700 shadow-lg transition-opacity hover:bg-opacity-90 hover:shadow-xl`
              : 'h-8 w-8 cursor-pointer rounded-full pt-2'
          }
          `}
        >
          <MoreVertical />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {actions &&
            actions.map((action, index) => {
              const { label, handleFuntion, icon } = action

              return (
                <DropdownMenuItem key={index} onClick={handleFuntion}>
                  {icon ?? ''}
                  <span>{label}</span>
                </DropdownMenuItem>
              )
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export { ActionsDropdown }
export type { IActionsDropdown, IActions }
