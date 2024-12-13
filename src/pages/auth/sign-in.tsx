import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { FieldErrors, useForm } from 'react-hook-form'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'
import { jwtDecode, JwtPayload as DefaultJwtPayload } from 'jwt-decode';

import { signIn } from '@/api/sign-in'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { queryClient } from '@/lib/react-query'
import { QUERY_KEYS } from '@/utils/constants'
import { ILoggedUserIdCache } from '@/utils/types'

const { GET_USER_ID_LOGGED_IN } = QUERY_KEYS

const signInForm = z.object({
  email: z.string().email('Invalid E-mail'),
  password: z.string().min(8, 'Must have at least 8 characters.'),
})

type ISignInForm = z.infer<typeof signInForm>

interface JwtPayload extends DefaultJwtPayload {
  userId: number;
}

export function SignIn() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ISignInForm>({
    resolver: zodResolver(signInForm),
    defaultValues: {
      email: searchParams.get('email') ?? '',
      password: '',
    },
  })

  const { mutateAsync: authenticate } = useMutation({
    mutationFn: signIn,
  })

  async function handleSignIn(data: ISignInForm) {
    try {
      const jwtToken = await authenticate({ email: data.email, password: data.password })

      if(!jwtToken?.data) {
        toast.error("Error trying to login, please try again", {
          duration: 2000,
        })
        return;
      }
      
      const decoded = jwtDecode<JwtPayload>(jwtToken.data);
      const userId = decoded?.userId;  
      
      queryClient.setQueryData(GET_USER_ID_LOGGED_IN, { userId } as ILoggedUserIdCache);

      toast.success('Login Success.', {
        duration: 4000,
      })

      navigate('/')
    } catch (e: any) {
      toast.error(e?.error ?? 'Invalid Credentials')
    }
  }

  function onFormError(errorFields: FieldErrors<ISignInForm>) {
    Object.values(errorFields).forEach((error) => {
      toast.error(error.message, {
        duration: 2000,
      })
    })
  }

  return (
    <>
      <Helmet title="Login" />
      <div className="flex w-[350px] min-w-[100%] items-center justify-center p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-up">New user</Link>
        </Button>

        <div className="flex w-[100%] max-w-[400px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Access Family Memories
            </h1>
            <p className="text-sm text-muted-foreground">
              Everything is better when shared
            </p>
          </div>

          <form
            className="space-y-4"
            onSubmit={handleSubmit(handleSignIn, onFormError)}
          >
            <div className="space-y-2">
              <Label htmlFor="email">Your e-mail</Label>
              <Input type="email" id="email" {...register('email')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Your password</Label>
              <Input type="password" id="password" {...register('password')} />
            </div>

            <Button disabled={isSubmitting} className="w-full">
              Access
            </Button>
          </form>
        </div>
      </div>
    </>
  )
}
