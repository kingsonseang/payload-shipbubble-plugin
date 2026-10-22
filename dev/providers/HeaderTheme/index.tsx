'use client'

import type { Theme } from '@/providers/Theme/types'

import { canUseDOM } from '@/utilities/canUseDOM'
import React, { createContext, use, useCallback, useState } from 'react'

export interface ContextType {
  headerTheme?: null | Theme
  setHeaderTheme: (theme: Theme | undefined) => void
}

const initialContext: ContextType = {
  headerTheme: undefined,
  setHeaderTheme: () => null,
}

const HeaderThemeContext = createContext(initialContext)

export const HeaderThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [headerTheme, setThemeState] = useState<Theme | undefined>(
    canUseDOM ? (document.documentElement.getAttribute('data-theme') as Theme) : undefined,
  )

  const setHeaderTheme = useCallback((themeToSet: Theme | undefined) => {
    setThemeState(themeToSet)
  }, [])

  return (
    <HeaderThemeContext value={{ headerTheme, setHeaderTheme }}>
      {children}
    </HeaderThemeContext>
  )
}

export const useHeaderTheme = (): ContextType => use(HeaderThemeContext)
