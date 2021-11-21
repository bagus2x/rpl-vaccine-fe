import Link from '@/components/ui/Link'
import { useSignIn } from '@/hooks/query/sign-in'
import useUser from '@/hooks/query/user'
import { isWebResponse } from '@/utils/web-response'
import ContactSupportRoundedIcon from '@mui/icons-material/ContactSupportRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Slide from '@mui/material/Slide'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import type { NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'

interface SignInForm {
  email: string
  password: string
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const Navigation = () => {
  const theme = useTheme()

  return (
    <Stack direction="row" spacing={2}>
      <Tooltip arrow title="Home">
        <span>
          <NextLink href="/" passHref>
            <IconButton
              sx={{
                color: theme.palette.text.secondary
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
                color: theme.palette.text.secondary
              }}
            >
              <ContactSupportRoundedIcon />
            </IconButton>
          </NextLink>
        </span>
      </Tooltip>
    </Stack>
  )
}

const UserLogin: NextPage = () => {
  const theme = useTheme()
  const [showPassword, setShowPassword] = useState(false)
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<SignInForm>()
  const router = useRouter()
  const signIn = useSignIn()
  const { enqueueSnackbar } = useSnackbar()
  const user = useUser()

  useEffect(() => {
    if (user.isSuccess) {
      router.push('/u')
    }
  }, [user])

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }

  const errorSnackbar = (msg: string) => {
    enqueueSnackbar(msg, { variant: 'error', preventDuplicate: true, autoHideDuration: 3000 })
  }

  const handleSignIn = handleSubmit((data) => {
    signIn.mutate(
      {
        email: data.email,
        password: data.password
      },
      {
        onError: (e: any) => {
          if (isWebResponse(e)) {
            errorSnackbar(e.response?.data.data ?? 'Terjadi kesalahan')
            return
          }
          errorSnackbar('Terjadi kesalahan')
        },
        onSuccess: () => {
          router.push('/u')
        }
      }
    )
  })

  return (
    <>
      <Head>
        <title>Daftar ke Vaccine Maps</title>
      </Head>
      <Container
        maxWidth="xl"
        sx={{
          mt: 2
        }}
      >
        <Navigation />
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
            spacing={1.5}
            component="form"
            onSubmit={handleSignIn}
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
              Masuk ke Vaccine Maps
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              label="Email"
              fullWidth
              InputLabelProps={{ shrink: true }}
              helperText={errors.email ? errors.email.message : ' '}
              error={!!errors.email}
              {...register('email', {
                required: { value: true, message: 'Email wajib diisi' },
                pattern: { value: emailPattern, message: 'Email tidak valid' }
              })}
            />
            <TextField
              variant="outlined"
              size="small"
              label="Password"
              fullWidth
              type={showPassword ? 'text' : 'password'}
              InputLabelProps={{ shrink: true }}
              helperText={errors.password ? errors.password.message : ' '}
              error={!!errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ mr: 0 }}>
                    <IconButton
                      edge="end"
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
              {...register('password', {
                required: { value: true, message: 'Password wajib diisi' },
                minLength: { value: 5, message: 'Panjang minimum 5 karakter' },
                maxLength: { value: 20, message: 'Panjang maximum 20 karakter' }
              })}
            />
            <Button
              disabled={user.isLoading}
              variant="contained"
              size="small"
              sx={{
                alignSelf: 'flex-end',
                width: { xs: '100%', md: 'auto' }
              }}
              type="submit"
            >
              MASUK
            </Button>
            <Stack
              spacing={0.5}
              sx={{
                alignSelf: 'flex-end',
                mt: '32px !important'
              }}
            >
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
