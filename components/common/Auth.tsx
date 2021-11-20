import useUser from '@/hooks/query/user'
import useHasRole from '@/hooks/query/has-role'
import { isUserAuthenticated, removeToken } from '@/utils/jwt'
import { isWebResponse } from '@/utils/web-response'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React, { FC, useEffect, useMemo } from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'
import NoSsr from '@mui/material/NoSsr'

type Role = 'ROLE_USER' | 'ROLE_ADMIN' | 'ALL'

interface AuthProps {
  role: Role
}

const Auth: FC<AuthProps> = ({ children, role = 'ALL' }) => {
  const router = useRouter()
  const user = useUser()
  const hasRole = useHasRole(user.data?.roles)
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (role !== 'ALL' && !isUserAuthenticated()) {
      router.push('/signin')
    }
  }, [])

  useEffect(() => {
    if (role !== 'ALL' && user.isSuccess) {
      if (!hasRole(role)) {
        router.push('/signin')
        return
      }
    }

    if (user.isError) {
      removeToken()
      const error = user.error
      if (isWebResponse(error)) {
        enqueueSnackbar(error.response?.data.data, { variant: 'error' })
      }
      router.push('/signin')
    }
  }, [user])

  return (
    <>
      {role === 'ALL' || user.isSuccess ? children : null}
      <NoSsr>
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={user.isLoading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </NoSsr>
    </>
  )
}

export default Auth
