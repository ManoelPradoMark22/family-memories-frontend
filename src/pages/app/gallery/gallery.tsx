import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import VisibilitySensor from 'react-visibility-sensor'

import { getGallery } from '@/api/get-gallery'
import { GridGalleryCard } from '@/components/grid-gallery-card'
import { queryClient } from '@/lib/react-query'
import { QUERY_KEYS } from '@/utils/constants'
import { ILoggedUserIdCache } from '@/utils/types'

const { GET_USER_ID_LOGGED_IN, GET_PHOTOS_GALLERY } = QUERY_KEYS

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

  console.log('photos')
  console.log(photos)

  const imageVisibleChange = (index: number, isVisible: boolean) => {
    if (isVisible) {
      setImagesShownArray((currentImagesShownArray) => {
        const updatedArray = [...currentImagesShownArray]
        updatedArray[index] = true
        return updatedArray
      })
    }
  }

  return (
    <>
      <Helmet title="Gallery" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tighter">Gallery</h1>
        <div className="grid grid-cols-2 gap-1">
          {photos &&
            photos.map(({ id, url }, index) => (
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
                />
              </VisibilitySensor>
            ))}
        </div>
      </div>
    </>
  )
}
