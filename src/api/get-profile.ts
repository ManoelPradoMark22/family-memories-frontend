import { api } from '@/lib/axios'

export interface IGetProfileResponse {
  id: number
  name: string
  email: string
  birthday: string
  avatar?: string
}

export async function getProfile(userId: number) {
  const response = await api.get<IGetProfileResponse>(`/user/profile/${userId}`)

  return response.data
}
