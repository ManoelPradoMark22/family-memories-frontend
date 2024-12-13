export type ILoggedUserIdCache =
  | {
      userId: number
    }
  | null
  | undefined

export interface IDatesResponse {
  created_at: string
  updated_at: string
}
