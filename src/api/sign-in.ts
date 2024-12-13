import { api } from "@/lib/axios";

export interface ISignInBody {
  email: string,
  password: string
}

export async function signIn({ email, password }: ISignInBody) {
  const jwtToken = await api.post<string>('/login', { email, password });

  return jwtToken;
}