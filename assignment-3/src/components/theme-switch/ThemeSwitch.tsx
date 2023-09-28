import { useEffect, useState } from 'react'

import { getLocalStorageItem, setLocalStorageItem } from '../../common/utils'

import styles from './ThemeSwitch.module.css'

type IThemeMode = string | 'dark' | 'light'

enum THEME_MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export function ThemeSwitch() {
  const storedTheme = getLocalStorageItem('themeMode')
  const [themeMode, setThemeMode] = useState<IThemeMode>(
    storedTheme === THEME_MODE.DARK ? storedTheme : THEME_MODE.LIGHT,
  )

  useEffect(() => {
    setLocalStorageItem('themeMode', themeMode)

    if (themeMode === THEME_MODE.DARK) {
      document.body.classList.add('dark-theme')
    } else {
      document.body.classList.remove('dark-theme')
    }
  }, [themeMode])

  const toggleTheme = () =>
    setThemeMode((mode: IThemeMode) =>
      mode === THEME_MODE.DARK ? THEME_MODE.LIGHT : THEME_MODE.DARK,
    )

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className={`${styles.ThemeSwitch} ${
        themeMode === 'dark' ? `${styles.ThemeSwitchDark}` : ''
      }`}
    >
      <div className={styles.Light}>☀️</div>
      <div className={styles.Dark}>🌙</div>
    </button>
  )
}
