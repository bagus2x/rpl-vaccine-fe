import Link from '@/components/ui/Link'
import IconButton from '@mui/material/IconButton'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Slide from '@mui/material/Slide'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import type { NextPage } from 'next'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import Tooltip from '@mui/material/Tooltip'
import ContactSupportRoundedIcon from '@mui/icons-material/ContactSupportRounded'
import NextLink from 'next/link'
import InputAdornment from '@mui/material/InputAdornment'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'
import { useState } from 'react'

const UserLogin: NextPage = () => {
  const theme = useTheme()
  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <>
      <Container
        maxWidth="xl"
        sx={{
          mt: 2
        }}
      >
        <Stack direction="row" spacing={2}>
          <Tooltip arrow title="Home">
            <span>
              <NextLink href="/" passHref>
                <IconButton
                  sx={{
                    color: theme.palette.text.primary
                  }}
                >
                  <HomeRoundedIcon />
                </IconButton>
              </NextLink>
            </span>
          </Tooltip>
          <Tooltip arrow title="Kontak">
            <span>
              <NextLink href="/contact" passHref>
                <IconButton
                  sx={{
                    color: theme.palette.text.primary
                  }}
                >
                  <ContactSupportRoundedIcon />
                </IconButton>
              </NextLink>
            </span>
          </Tooltip>
        </Stack>
      </Container>
      <Slide in direction="down" timeout={1000}>
        <Container
          maxWidth="sm"
          sx={{
            mt: 4,
            bgcolor: theme.palette.background.default
          }}
        >
          <Stack
            spacing={2}
            sx={{
              width: '100%',
              borderRadius: 4,
              boxShadow: theme.shadows[4],
              p: { xs: 2, md: 4 }
            }}
          >
            <Typography
              variant="h1"
              sx={{
                ...theme.typography.h5,
                mb: 2
              }}
            >
              Masuk ke Vaksin Maps
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              label="Email"
              fullWidth
              helperText="Ini adalah warning"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              variant="outlined"
              size="small"
              label="Password"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              helperText="Ini adalah warning"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      size="small"
                      onClick={handleClickShowPassword}
                      sx={{
                        color: theme.palette.text.secondary
                      }}
                    >
                      {showPassword ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Button variant="contained" size="small" sx={{ alignSelf: 'flex-end' }}>
              MASUK
            </Button>
            <Stack
              spacing={0.5}
              sx={{
                alignSelf: 'flex-end',
                mt: '32px !important'
              }}
            >
              <Link
                href="/forgot-password"
                variant="caption"
                sx={{
                  textDecoration: 'none',
                  alignSelf: 'flex-end'
                }}
              >
                Lupa password?
              </Link>
              <Stack direction="row">
                <Typography variant="caption">Belum punya akun?&nbsp;</Typography>
                <Link
                  href="/signup"
                  variant="caption"
                  sx={{
                    textDecoration: 'none'
                  }}
                >
                  Daftar
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Slide>
    </>
  )
}

export default UserLogin
