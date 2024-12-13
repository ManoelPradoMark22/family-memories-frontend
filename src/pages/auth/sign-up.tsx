import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Helmet } from 'react-helmet-async'
import { FieldErrors, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { z } from 'zod'

import { registerUser } from '@/api/register-user'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const signUpForm = z.object({
  name: z.string().min(1, 'Insert your name.'),
  email: z.string().email('Invalid E-mail.'),
  birthday: z.string().min(1, 'Insert your birthday.'),
  password: z.string().min(8, 'Must have at least 8 characters.'),
})

type ISignUpForm = z.infer<typeof signUpForm>

export function SignUp() {
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ISignUpForm>({
    resolver: zodResolver(signUpForm),
    defaultValues: {
      name: '',
      email: '',
      birthday: '',
      password: ''
    },
  })

  const { mutateAsync: registerUserFn } = useMutation({
    mutationFn: registerUser,
  })

  async function handleSignUp(data: ISignUpForm) {
    try {
      await registerUserFn({
        email: data.email,
        name: data.name,
        birthday: data.birthday,
        password: data.password
      })

      toast.success('User successfully registered.', {
        duration: 6000,
        description: 'Now, login to access Home.',
      })
      navigate(`/sign-in?email=${data.email}`)
    } catch (e: any) {
      toast.error(e?.error ?? 'Error while registering user.')
    }
  }

  function onFormError(errorFields: FieldErrors<ISignUpForm>) {
    Object.values(errorFields).forEach((error) => {
      toast.error(error.message, {
        duration: 2000,
      })
    })
  }

  return (
    <>
      <Helmet title="Register" />
      <div className="flex w-[350px] min-w-[100%] items-center justify-center p-8">
        <Button variant="ghost" asChild className="absolute right-8 top-8">
          <Link to="/sign-in">Login</Link>
        </Button>

        <div className="flex w-[100%] max-w-[400px] flex-col justify-center gap-6">
          <div className="flex flex-col gap-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Create account
            </h1>
            <p className="text-sm text-muted-foreground">
              Everything is better when shared
            </p>
          </div>

          <form
            className="space-y-4"
            onSubmit={handleSubmit(handleSignUp, onFormError)}
          >
            <div className="space-y-2">
              <Label htmlFor="name">Your name</Label>
              <Input
                type="text"
                id="name"
                {...register('name')}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Your e-mail</Label>
              <Input type="email" id="email" {...register('email')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="birthday">Your birthday</Label>
              <Input type="date" id="birthday" {...register('birthday')} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Your password</Label>
              <Input type="password" id="password" {...register('password')} />
            </div>

            <Button disabled={isSubmitting} className="w-full">
              Register
            </Button>

            <p className="px-6 text-center text-sm leading-relaxed text-muted-foreground">
                By continuing, you agree to our{' '}
              <a href="" className="underline underline-offset-4">
                Terms of service
              </a>{' '}
                and{' '}
              <a href="" className="underline underline-offset-4">
                privacy policies
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </>
  )
}
