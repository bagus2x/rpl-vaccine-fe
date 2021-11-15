import { cyan, lightGreen, red } from '@mui/material/colors'
import { createTheme, Theme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import React, { Dispatch, FC, useContext, useMemo, useReducer } from 'react'

interface ThemeProviderProps {
  children: React.ReactNode
  theme: Theme
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

const ThemeProvider: FC<ThemeProviderProps> = ({ children, theme }) => {
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
  }, [theme, value.mode])

  return (
    <MuiThemeProvider theme={memoizedTheme}>
      <ThemeDispatchContext.Provider value={value}>{children}</ThemeDispatchContext.Provider>
    </MuiThemeProvider>
  )
}

export const useChangeThemeMode = () => {
  const { dispatch, mode } = useContext(ThemeDispatchContext)

  const changeThemeMode = React.useCallback(
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
