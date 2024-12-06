'use client'
import cn from '../stylesheet/FormLogin.module.css'
import { loginService } from '../feature/auth.service'
import { useForm } from 'react-hook-form'
import { loginSchema, LoginSchema } from '../feature/auth.vaidator'
import { zodResolver } from '@hookform/resolvers/zod'
import { useKeyBox } from '@/utils/useKeyBox'


const FormLogin = () => {
  const { auth_login: t } = useKeyBox()
  const login = loginService()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })
  const onSubmit = (data: LoginSchema) => {
    login.mutate(data)
  }

  return (
    <div className={cn.login}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-sm mx-auto p-4 border rounded "
      >
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            {t.user}
          </label>
          <input
            type="text"
            id="username"
            {...register('username')}
            className={`w-full px-3 py-2 border rounded ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.username && (
            <p className="mt-1 text-sm text-red-500">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            {t.pass}
          </label>
          <input
            type="password"
            id="password"
            {...register('password')}
            className={`w-full px-3 py-2 border rounded ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">
              {errors.password.message}
            </p>
          )}
        </div>

        {t?.button && (
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-green-600 rounded hover:bg-green-800"
          >
            {t.button}
          </button>
        )}
      </form>
    </div>
  )
}

export default FormLogin
