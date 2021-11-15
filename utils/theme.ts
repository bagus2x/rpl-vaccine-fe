import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import { cyan, lightGreen, red } from '@mui/material/colors'

const theme = createTheme({
  palette: {
    mode: 'light',
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

export default responsiveFontSizes(theme)
