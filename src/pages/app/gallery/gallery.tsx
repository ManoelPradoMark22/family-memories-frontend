import { useMutation, useQuery } from '@tanstack/react-query'
import { FolderPlus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import VisibilitySensor from 'react-visibility-sensor'
import { toast } from 'sonner'

import { detelePhoto } from '@/api/delete-photo'
import { getGallery } from '@/api/get-gallery'
import { ConfirmationDialog } from '@/components/confirmation-dialog'
import { GridGalleryCard } from '@/components/grid-gallery-card'
import { Dialog } from '@/components/ui/dialog'
import { queryClient } from '@/lib/react-query'
import { CLASS_STYLES, QUERY_KEYS } from '@/utils/constants'
import { ILoggedUserIdCache } from '@/utils/types'

interface IHandleOpenAddPhotoToAlbum {
  photoId: number
  userId: number
  url: string
}

interface IAddPhotoToAlbumModal {
  isOpen: boolean
  photoInfo?: IHandleOpenAddPhotoToAlbum
}

const { GET_USER_ID_LOGGED_IN, GET_PHOTOS_GALLERY } = QUERY_KEYS

const { ACTION_ICON_DROPDOWN_STYLE } = CLASS_STYLES

export function Gallery() {
  const loggedUserId: ILoggedUserIdCache = queryClient.getQueryData(
    GET_USER_ID_LOGGED_IN,
  )

  const queryFnToUse = loggedUserId?.userId
    ? { queryFn: () => getGallery(loggedUserId.userId) }
    : {}

  const { data: photos } = useQuery({
    queryKey: GET_PHOTOS_GALLERY,
    staleTime: Infinity,
    ...queryFnToUse,
    enabled: !!loggedUserId?.userId,
  })

  const [imagesShownArray, setImagesShownArray] = useState<boolean[]>(
    photos ? Array(photos.length).fill(false) : [],
  )

  const imageVisibleChange = (index: number, isVisible: boolean) => {
    if (isVisible) {
      setImagesShownArray((currentImagesShownArray) => {
        const updatedArray = [...currentImagesShownArray]
        updatedArray[index] = true
        return updatedArray
      })
    }
  }

  const initialAddPhotoToAlbumState: IAddPhotoToAlbumModal = { isOpen: false }

  const [addPhotoToAlbumModalIsOpen, setAddPhotoToAlbumModalIsOpen] =
    useState<IAddPhotoToAlbumModal>(initialAddPhotoToAlbumState)

  const [deletePhotoModalIsOpen, setDeletePhotoModalIsOpen] = useState<
    number | undefined
  >()

  const handleCloseDeletePhotoModal = () => {
    setDeletePhotoModalIsOpen(undefined)
  }

  const handleOpenDeletePhotoModal = (photoId: number) => {
    setDeletePhotoModalIsOpen(photoId)
  }

  const handleOpenAddPhotoToAlbum = ({
    photoId,
    userId,
    url,
  }: IHandleOpenAddPhotoToAlbum) => {
    setAddPhotoToAlbumModalIsOpen({
      isOpen: true,
      photoInfo: {
        photoId,
        userId,
        url,
      },
    })
  }

  const { mutateAsync, isPending: isPendingDeletion } = useMutation({
    mutationFn: detelePhoto,
  })

  const handleSubmitDeletePhoto = async () => {
    if (!deletePhotoModalIsOpen) {
      return
    }

    try {
      toast.loading('Deleting photo')

      await mutateAsync(deletePhotoModalIsOpen)

      toast.dismiss()
      toast.success('Photo successfully deleted!')

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      toast.dismiss()
      toast.error(e?.error ?? 'Error deleting photo, please try again.')
    }
  }

  return (
    <>
      <Helmet title="Gallery" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tighter">Gallery</h1>
        <div className="grid grid-cols-2 gap-1">
          {photos &&
            photos.map(({ id, url, user_id: userId }, index) => (
              <VisibilitySensor
                key={id}
                partialVisibility={true}
                offset={{ bottom: 80 }}
                onChange={(isVisible: boolean) =>
                  imageVisibleChange(index, isVisible)
                }
              >
                <GridGalleryCard
                  imageUrl={url}
                  show={imagesShownArray[index]}
                  actions={[
                    {
                      label: 'Add to album',
                      handleFuntion: () =>
                        handleOpenAddPhotoToAlbum({
                          photoId: id,
                          userId,
                          url,
                        }),
                      icon: (
                        <FolderPlus className={ACTION_ICON_DROPDOWN_STYLE} />
                      ),
                    },
                    {
                      label: 'Delete',
                      handleFuntion: () => handleOpenDeletePhotoModal(id),
                      icon: <Trash2 className={ACTION_ICON_DROPDOWN_STYLE} />,
                    },
                  ]}
                />
              </VisibilitySensor>
            ))}
        </div>
      </div>
      <Dialog
        open={!!deletePhotoModalIsOpen}
        onOpenChange={handleCloseDeletePhotoModal}
      >
        <ConfirmationDialog
          title="Delete Photo"
          description="Are you sure you want to delete this photo? It will be removed from all albums."
          type="destructive"
          disabled={isPendingDeletion}
          onCloseFn={handleCloseDeletePhotoModal}
          confirmationFn={handleSubmitDeletePhoto}
        />
      </Dialog>
    </>
  )
}
