import { api } from '@/lib/axios'

export interface IRegisterRestaurantBody {
  email: string
  birthday: string
  name: string,
  password: string
}

export async function registerUser({
  email,
  name,
  birthday,
  password
}: IRegisterRestaurantBody) {
  await api.post('/user', {
    email,
    birthday,
    name,
    password
  })
}
