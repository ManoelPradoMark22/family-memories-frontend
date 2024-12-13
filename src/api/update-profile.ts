import { api } from '@/lib/axios'

export interface IUpdateProfileBody {
  name: string
}

export interface IUpdateProfileParams {
  body: IUpdateProfileBody
  id: number
}

export async function updateProfile({ body, id }: IUpdateProfileParams) {
  const { name } = body;
  await api.put(`/user/${id}`, { name })
}
