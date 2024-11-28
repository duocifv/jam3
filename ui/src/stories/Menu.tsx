import React, { FC, ReactNode } from 'react'
import cn from './Menu.module.scss'
import clsx from 'clsx'

export const MenuItem: FC<{
  title: string
  body?: string
  icon?: ReactNode
}> = (props) => {
  return (
    <div className={cn.menuItem}>
      {props.icon && <span className={cn.icon}>{props.icon}</span>}
      <div className={cn.box}>
        <div className={cn.title}>{props.title}</div>
        {props.body && <div className={cn.body}>{props.body}</div>}
      </div>
    </div>
  )
}

export const Menu: FC<{
  children?: ReactNode
  className?: string
}> = (props) => {
  return (
    <div className={clsx(props.className, cn.menu)} {...props}>
      {props.children}
    </div>
  )
}
