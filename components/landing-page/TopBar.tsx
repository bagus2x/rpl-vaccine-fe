import ButtonLink from '@/components/ui/ButtonLink'
import ScrollableLink from '@/components/ui/ScrollableLink'
import logo from '@/public/assets/logo.svg'
import AppBar from '@mui/material/AppBar'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from 'next/image'
import { Fragment } from 'react'

const TopBar = () => {
  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Fragment>
      <AppBar elevation={1}>
        <Toolbar
          component={Container}
          maxWidth="xl"
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr 1fr',
              md: '1fr  1fr 1fr'
            }
          }}
        >
          <Stack direction="row" flexGrow={1} spacing={2} justifyContent="start" alignItems="center">
            <Image src={logo} height={50} width={50} />
            <Typography fontSize={18} variant="subtitle1">
              Vaccine Maps
            </Typography>
          </Stack>
          {!mdDown && (
            <Stack
              spacing={8}
              direction="row"
              sx={{
                flexGrow: 1,
                justifyContent: 'center'
              }}
            >
              <ScrollableLink
                to="vaccination"
                sx={{
                  color: theme.palette.common.white,
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
              >
                Vaksinasi
              </ScrollableLink>
              <ScrollableLink
                to="information"
                sx={{
                  color: theme.palette.common.white,
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}
              >
                Pengetahuan
              </ScrollableLink>
            </Stack>
          )}
          <Stack flexGrow={1} alignItems="center" justifyContent="flex-end" direction="row">
            <ButtonLink variant="contained" color="secondary" disableElevation href="/signin">
              MASUK
            </ButtonLink>
          </Stack>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </Fragment>
  )
}

export default TopBar
