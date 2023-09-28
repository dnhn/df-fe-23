import { ButtonHTMLAttributes } from 'react'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'error' | 'info' | 'primary' | 'warning'
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
      className={`button ${variant ? `button--${variant}` : ''} ${classes}`}
      {...other}
    >
      {children}
    </button>
  )
}
