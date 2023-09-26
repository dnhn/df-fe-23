import { ReactNode } from 'react'

interface IButton {
  children: ReactNode
  type?: 'submit' | 'reset' | 'button' | undefined
  variant?: string
  classes?: string
}

export function Button({
  children,
  type = 'button',
  variant,
  classes = '',
  ...other
}: IButton) {
  return (
    <button
      type={type}
      className={`btn ${variant ? `btn--${variant}` : ''} ${classes}`}
      {...other}
    >
      {children}
    </button>
  )
}
