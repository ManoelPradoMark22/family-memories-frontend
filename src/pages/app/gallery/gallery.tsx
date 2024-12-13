import { Helmet } from 'react-helmet-async'

import { QUERY_KEYS } from '@/utils/constants'

const { GET_USER_ID_LOGGED_IN } = QUERY_KEYS

export function Gallery() {
  return (
    <>
      <Helmet title="Gallery" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tighter">Gallery</h1>
      </div>
    </>
  )
}
