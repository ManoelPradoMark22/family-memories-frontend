import { QUERY_KEYS } from '@/utils/constants';
import { Helmet } from 'react-helmet-async'

const { GET_USER_ID_LOGGED_IN } = QUERY_KEYS

export function Albums() {

  return (
    <>
      <Helmet title="Albums" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Albums</h1>

        <div className="space-y-2.5">
          
        </div>
      </div>
    </>
  )
}
