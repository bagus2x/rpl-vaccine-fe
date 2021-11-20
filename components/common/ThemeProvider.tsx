import type {} from '@mui/lab/themeAugmentation'
import { cyan, lightGreen, red } from '@mui/material/colors'
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import Head from 'next/head'
import React, { Dispatch, FC, useContext, useMemo, useReducer, useCallback } from 'react'

interface ThemeProviderProps {
  children: React.ReactNode
}

type ThemeMode = 'dark' | 'light'

interface Action {
  type: 'change_mode'
  payload: ThemeMode
}

const initialMode =
  typeof window !== 'undefined' ? (localStorage.getItem('theme_mode') as ThemeMode) ?? 'light' : 'light'

const ThemeDispatchContext = React.createContext<{ mode: ThemeMode; dispatch: Dispatch<Action> }>({
  mode: initialMode,
  dispatch: () => null
})

function reducer(mode: ThemeMode = initialMode, action: Action) {
  switch (action.type) {
    case 'change_mode':
      return action.payload
    default:
      return mode
  }
}

const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const [mode, dispatch] = useReducer(reducer, initialMode)
  const value = useMemo(() => ({ mode, dispatch }), [mode, dispatch])

  const memoizedTheme = useMemo(() => {
    return createTheme({
      palette: {
        mode: value.mode,
        primary: {
          main: cyan[700]
        },
        secondary: {
          main: lightGreen[700]
        },
        error: {
          main: red.A400
        }
      },
      typography: {
        fontFamily: ['Roboto', ' sans-serif'].join(','),
        button: {
          textTransform: 'none'
        }
      }
    })
  }, [value.mode])

  return (
    <>
      <Head>
        <meta name="theme-color" content={memoizedTheme.palette.primary.main} />
      </Head>
      <MuiThemeProvider theme={memoizedTheme}>
        <ThemeDispatchContext.Provider value={value}>{children}</ThemeDispatchContext.Provider>
      </MuiThemeProvider>
    </>
  )
}

export const useChangeThemeMode = () => {
  const { dispatch, mode } = useContext(ThemeDispatchContext)

  const changeThemeMode = useCallback(
    (mode: ThemeMode) =>
      dispatch({
        type: 'change_mode',
        payload: mode
      }),
    [mode]
  )

  return { mode, changeThemeMode }
}

export default ThemeProvider
