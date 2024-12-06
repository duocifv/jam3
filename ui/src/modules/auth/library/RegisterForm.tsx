import Button from '@/components/Button'
import Input from '@/components/Input'
import { useForm } from 'react-hook-form'
import cn from '../stylesheet/FormRegister.module.css'
import { registerService } from '../feature/auth.service'
import { AuthRegister } from '../feature/auth.types'
import { decodeHtml } from '@/utils/decodeHtml'
import { useKeyBox } from '@/utils/useKeyBox'
import { Field } from '@/components/Field'

const RegisterForm = () => {
  const { auth_register: t } = useKeyBox()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthRegister>()
  const { mutate, error, data, isSuccess, isError } = registerService()

  return (
    <div className={cn.container}>
      {isError && (
        <div dangerouslySetInnerHTML={{ __html: ` ${decodeHtml(error)}` }} />
      )}
      {isSuccess && <div dangerouslySetInnerHTML={{ __html: ` ${data}` }} />}
      <form onSubmit={handleSubmit((data: AuthRegister) => mutate(data))}>
        <div>
          <Input
            {...register('username', { required: 'Username is required' })}
            placeholder="Username"
          />
          <p>{errors.username?.message}</p>
        </div>
        <div>
          <Input
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 6, message: 'At least 6 characters' },
            })}
            type="password"
            placeholder="Password"
          />
          <p>{errors.password?.message}</p>
        </div>
        .
        <div>
          <Field
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i,
                message: 'Invalid email',
              },
            })}
            placeholder="Email"
            copy={t.email}
          />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <Input
            {...register('firstName', { required: 'firstName is required' })}
            placeholder="firstName"
          />
          <p>{errors.firstName?.message}</p>
        </div>
        <div>
          <Input
            {...register('lastName', { required: 'lastName is required' })}
            placeholder="lastName"
          />
          <p>{errors.lastName?.message}</p>
        </div>
        <Button type="submit">{t.button}</Button>
      </form>
    </div>
  )
}

export default RegisterForm
