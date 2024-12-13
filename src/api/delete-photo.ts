import { api } from '@/lib/axios'

export async function detelePhoto(userId: number) {
  await api.delete(`/photo/${userId}`)
}
