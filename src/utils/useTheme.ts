import React, { useEffect } from "react";

type Theme = 'light' | 'dark' | 'system';
const matchSystemTheme = window.matchMedia('(prefers-color-scheme: dark)')

function followSystemTheme() {
  const theme = matchSystemTheme.matches ? 'dark' : 'light'
  document.documentElement.dataset.theme = theme
}

export function useTheme() {
  const [theme, setTheme] = React.useState<Theme>(localStorage.getItem('theme') as Theme ?? 'system');

  useEffect(() => {
    if (theme === 'system') {
      matchSystemTheme.addEventListener('change', followSystemTheme);

    } else {
      matchSystemTheme.removeEventListener('change', followSystemTheme);
      document.documentElement.dataset.theme = theme;
    }
    localStorage.setItem('theme', theme);
  }, [theme]);



  return { theme, setTheme };
}