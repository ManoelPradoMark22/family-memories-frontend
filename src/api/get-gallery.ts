import { api } from '@/lib/axios'
import { IDatesResponse } from '@/utils/types'

export interface IGetGalleryResponse extends IDatesResponse {
  id: number
  user_id: number
  url: string
}

export async function getGallery(userId: number) {
  const response = await api.get<IGetGalleryResponse[]>(`/photo/${userId}/user`)

  return response.data
}
