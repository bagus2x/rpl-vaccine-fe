import Link from '@/components/ui/Link'
import useSignUp from '@/hooks/query/sign-up'
import ContactSupportRoundedIcon from '@mui/icons-material/ContactSupportRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import VisibilityOffRoundedIcon from '@mui/icons-material/VisibilityOffRounded'
import VisibilityRoundedIcon from '@mui/icons-material/VisibilityRounded'
import DatePicker from '@mui/lab/DatePicker'
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
import { useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import DateAdapter from '@mui/lab/AdapterMoment'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { isWebResponse } from '@/utils/web-response'
import { useSnackbar } from 'notistack'
import useUser from '@/hooks/query/user'

interface SignUpForm {
  name: string
  email: string
  password: string
  password2: string
  dateOfBirth: Date | null
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
  const [showConfPassword, setShowConfPassword] = useState(false)
  const {
    handleSubmit,
    register,
    watch,
    control,
    formState: { errors }
  } = useForm<SignUpForm>()
  const router = useRouter()
  const signUp = useSignUp()
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

  const handleClickShowConfPassword = () => {
    setShowConfPassword(!showConfPassword)
  }

  const errorSnackbar = (msg: string) => {
    enqueueSnackbar(msg, { variant: 'error', preventDuplicate: true, autoHideDuration: 3000 })
  }

  const handleSignUp = handleSubmit((data) => {
    signUp.mutate(
      {
        name: data.name,
        email: data.email,
        password: data.password,
        dateOfBirth: new Date(data.dateOfBirth as Date).getTime()
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
            onSubmit={handleSignUp}
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
              Daftar ke Vaccine Maps
            </Typography>
            <TextField
              variant="outlined"
              size="small"
              label="Nama"
              fullWidth
              InputLabelProps={{ shrink: true }}
              helperText={errors.name ? errors.name.message : ' '}
              error={!!errors.name}
              {...register('name', {
                required: 'Nama pengguna wajib diisi'
              })}
            />
            <TextField
              variant="outlined"
              size="small"
              label="Email"
              fullWidth
              InputLabelProps={{ shrink: true }}
              helperText={errors.email ? errors.email.message : ' '}
              error={!!errors.email}
              {...register('email', {
                required: 'Email wajib diisi',
                pattern: { value: emailPattern, message: 'Email tidak valid' }
              })}
            />
            <LocalizationProvider dateAdapter={DateAdapter}>
              <Controller
                name="dateOfBirth"
                defaultValue={null}
                control={control}
                rules={{
                  required: 'Tanggal lahir wajib diisi'
                }}
                render={({ field: { onChange, value } }) => (
                  <DatePicker
                    disableFuture
                    label="Responsive"
                    onChange={onChange}
                    openTo="year"
                    value={value}
                    views={['year', 'day']}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        size="small"
                        label="Tanggal lahir"
                        fullWidth
                        InputLabelProps={{ shrink: true }}
                        helperText={errors.dateOfBirth ? errors.dateOfBirth.message : ' '}
                        error={!!errors.dateOfBirth}
                      />
                    )}
                  />
                )}
              />
            </LocalizationProvider>
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
                  <InputAdornment position="end" sx={{ m: 0 }}>
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
                required: 'Password wajib diisi',
                minLength: { value: 5, message: 'Panjang minimum 5 karakter' }
              })}
            />
            <TextField
              variant="outlined"
              size="small"
              label="Konfirmasi password"
              fullWidth
              type={showConfPassword ? 'text' : 'password'}
              InputLabelProps={{ shrink: true }}
              helperText={errors.password2 ? errors.password2.message : ' '}
              error={!!errors.password2}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ m: 0 }}>
                    <IconButton
                      edge="end"
                      onClick={handleClickShowConfPassword}
                      sx={{
                        color: theme.palette.text.secondary
                      }}
                    >
                      {showConfPassword ? <VisibilityRoundedIcon /> : <VisibilityOffRoundedIcon />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
              {...register('password2', {
                required: 'Password wajib diisi',
                validate: (value) => watch('password') === value || 'Password tidak cocok'
              })}
            />
            <Button
              disabled={user.isLoading}
              variant="contained"
              size="small"
              sx={{ alignSelf: 'flex-end' }}
              type="submit"
            >
              DAFTAR
            </Button>
            <Stack
              spacing={0.5}
              sx={{
                alignSelf: 'flex-end',
                mt: '32px !important'
              }}
            >
              <Stack direction="row">
                <Typography variant="caption">Sudah punya akun?&nbsp;</Typography>
                <Link
                  href="/signin"
                  variant="caption"
                  sx={{
                    textDecoration: 'none'
                  }}
                >
                  Masuk
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
