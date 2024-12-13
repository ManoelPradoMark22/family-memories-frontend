import { http, HttpResponse } from 'msw'

import { IGetProfileResponse } from '../get-profile'

export const getProfileMock = http.get<never, never, IGetProfileResponse>(
  '/user/profile',
  () => {
    return HttpResponse.json({
      id: 1,
      name: 'Manoel Prado',
      email: 'manoelprado.aecjr@gmail.com',
      birthday: '1996-03-13'
    })
  },
)
