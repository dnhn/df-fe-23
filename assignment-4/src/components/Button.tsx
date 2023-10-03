import { ButtonHTMLAttributes } from 'react'

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'error' | 'info' | 'primary' | 'warning'
  size?: 'small' | 'large'
}

export default function Button({
  children,
  type = 'button',
  variant,
  size,
  ...other
}: IButton) {
  return (
    <button
      {...other}
      type={type}
      className={`button ${variant ? `button--${variant}` : ''} ${
        size ? `button--${size}` : ''
      } ${other.className ? other.className : ''}`}
    >
      {children}
    </button>
  )
}
