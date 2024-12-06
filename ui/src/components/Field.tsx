import clsx from 'clsx'
import React, { FC, InputHTMLAttributes, ReactNode } from 'react'

export const Field: FC<
  {
    copy?: string | ReactNode
    value?: string
    className?: string
  } & InputHTMLAttributes<HTMLInputElement>
> = ({ copy, value, className, ...rest }) => {
  return (
    <div className="mb-6">
      {copy && <div className="mb-3 w-full">{copy}</div>}
      <input
        type="text"
        defaultValue={value}
        className={clsx(
          `bg-slate-100 border w-full rounded-md px-4 py-2`,
          className
        )}
        {...rest}
      />
    </div>
  )
}
