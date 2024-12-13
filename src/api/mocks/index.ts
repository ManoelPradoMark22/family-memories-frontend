import { setupWorker } from 'msw/browser'

import { env } from '@/env'

import { getProfileMock } from './get-profile-mock'
import { signInMock } from './sign-in-mock'
import { updateProfileMock } from './update-profile-mock'

export const worker = setupWorker(signInMock, getProfileMock, updateProfileMock)

export async function enableMSW() {
  if (env.MODE !== 'test') {
    return
  }

  await worker.start()
}
