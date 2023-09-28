import { ButtonHTMLAttributes } from 'react'

import styles from './Button.module.css'

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
  const ButtonVariantMap: { [key: string]: string } = {
    error: styles.ButtonError,
    info: styles.ButtonInfo,
    primary: styles.ButtonPrimary,
    warning: styles.ButtonWarning,
  }

  return (
    <button
      type={type}
      className={`${styles.Button} ${
        variant ? `${ButtonVariantMap[variant]}` : ''
      } ${classes}`}
      {...other}
    >
      {children}
    </button>
  )
}
