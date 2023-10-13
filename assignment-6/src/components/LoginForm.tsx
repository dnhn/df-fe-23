'use client'

import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

import Button from '@/src/components/Button'
import { SPECIAL_CHARS } from '@/src/lib/constants'
import PasswordMeter from '@/src/components/PasswordMeter'
import { useAuthContext } from '@/src/auth/AuthContext'

export default function LoginForm() {
  const [formInit, setFormInit] = useState(false)
  const { login } = useAuthContext()
  const schema = z
    .object({
      email: z.string().email({ message: 'Email is not valid.' }),
      password: z
        .string()
        .min(8, {
          message:
            'Password must be at least 8 characters and contain uppercase letters and symbols.',
        })
        .refine(
          (value) => {
            return value !== value.toLowerCase() && SPECIAL_CHARS.test(value)
          },
          {
            message: 'Password must contain uppercase letters and symbols.',
          },
        ),
    })
    .required()
  type Schema = z.infer<typeof schema>
  const {
    formState: { errors, isSubmitting, isSubmitSuccessful },
    getValues,
    handleSubmit,
    register,
    setError,
    watch,
  } = useForm<Schema>({
    progressive: true,
    resolver: zodResolver(schema),
    defaultValues: {
      email: process.env.NEXT_PUBLIC_EMAIL ?? '',
      password: process.env.NEXT_PUBLIC_PASSWORD ?? '',
    },
  })

  useEffect(() => {
    setFormInit(true)
  }, [])

  watch('password')
  const passwordValue = getValues('password')

  const formSubmit: SubmitHandler<Schema> = async (data) => {
    try {
      await login(data.email, data.password)
    } catch (error) {
      setError('root', { message: error.message })
    }
  }

  return (
    <form
      noValidate={formInit}
      onSubmit={handleSubmit(formSubmit)}
      className="relative w-[22.5rem] max-w-[calc(100%-2rem)] rounded-xl bg-white/10 p-8 text-white shadow-xl backdrop-blur-md"
    >
      <div className="mb-4 text-center text-2xl font-bold">Bookstore</div>
      {errors.root && (
        <div className="mb-4 rounded bg-amber-500 p-2 text-sm text-black">
          {errors.root.message}
        </div>
      )}
      <div className="flex flex-col gap-4">
        <label htmlFor="email" className="relative">
          <div className="text-sm">Email</div>
          <input
            {...register('email')}
            type="email"
            inputMode="email"
            id="email"
            autoFocus
            required
            disabled={isSubmitting || isSubmitSuccessful}
            className={`peer block w-full border-0 border-b-2 bg-transparent px-0 py-1 focus:ring-0 ${
              errors.email
                ? 'border-red-500 focus:border-red-500'
                : 'border-neutral-400 focus:border-white'
            }`}
          />
          {errors.email && (
            <p className="pointer-events-none absolute left-0 top-[95%] z-[1] select-none rounded bg-amber-100 p-1 text-xs font-medium text-red-600 opacity-0 transition-all peer-focus:top-[calc(100%+.125rem)] peer-focus:opacity-100">
              {errors.email.message}
            </p>
          )}
        </label>
        <label htmlFor="password">
          <div className="text-sm">Password</div>
          <div className="relative">
            <input
              {...register('password')}
              type="password"
              id="password"
              required
              disabled={isSubmitting || isSubmitSuccessful}
              className="peer block w-full border-0 bg-transparent px-0 py-1 focus:ring-0"
            />
            {errors.password && (
              <p className="pointer-events-none absolute left-0 top-[calc(100%+.75rem)] z-[1] select-none rounded bg-amber-100 p-1 text-xs font-medium text-red-600 opacity-0 transition-all peer-focus:top-[calc(100%+.875rem)] peer-focus:opacity-100">
                {errors.password.message}
              </p>
            )}
          </div>
          <PasswordMeter text={passwordValue} />
        </label>
        <Button type="submit" disabled={isSubmitting || isSubmitSuccessful}>
          {isSubmitting || isSubmitSuccessful ? 'Logging in…' : 'Login'}
        </Button>
      </div>
    </form>
  )
}
