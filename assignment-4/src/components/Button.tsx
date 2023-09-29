import { ButtonHTMLAttributes } from 'react'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'error' | 'info' | 'primary' | 'warning'
}

export default function Button({
  children,
  type = 'button',
  variant,
  ...other
}: IButton) {
  return (
    <button
      {...other}
      type={type}
      className={`button ${variant ? `button--${variant}` : ''} ${
        other.className
      }`}
    >
      {children}
    </button>
  )
}
