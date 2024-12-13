import { ActionsDropdown, IActions } from './actions-dropdown'
import { ContextMenu, ContextMenuTrigger } from './ui/context-menu'

interface GridGalleryCardProps {
  imageUrl: string
  title?: string
  show: boolean
  actions?: IActions[]
}

export function GridGalleryCard({
  imageUrl,
  title,
  show,
  actions,
}: GridGalleryCardProps) {
  return (
    <div className="group-actions-dropdown relative overflow-hidden rounded-md">
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            className={`relative transform transition duration-300 ease-in ${
              show ? '' : 'translate-y-16 opacity-0'
            }`}
          >
            <div className="absolute inset-0 z-10 flex transition duration-200 ease-in hover:opacity-0">
              <div className="absolute inset-0 opacity-20 md:bg-black"></div>
              {title && (
                <div className="z-10 mx-auto self-center text-sm uppercase tracking-widest text-white">
                  {title}
                </div>
              )}
            </div>
            <img src={imageUrl} alt="" />
          </div>
          {actions && <ActionsDropdown actions={actions} isAbsolute={true} />}
        </ContextMenuTrigger>
      </ContextMenu>
    </div>
  )
}
