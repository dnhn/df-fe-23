import { useEffect, useState } from 'react';
import { getLocalStorageItem, setLocalStorageItem } from '../common/utils';

import './ThemeSwitch.css';

export default function ThemeSwitch() {
  const storedTheme = getLocalStorageItem('themeMode');
  const [themeMode, setThemeMode] = useState(storedTheme === 'dark' ? storedTheme : 'light');

  useEffect(() => {
    setLocalStorageItem('themeMode', themeMode);

    if (themeMode === 'dark') {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [themeMode]);

  const toggleTheme = () => setThemeMode(mode => mode === 'dark' ? 'light' : 'dark');

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={toggleTheme}
      className={`theme-switch ${themeMode === 'dark' ? 'theme-switch--dark' : ''}`}
    >
      <div className="light">☀️</div>
      <div className="dark">🌙</div>
    </button>
  )
}
