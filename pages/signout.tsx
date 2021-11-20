import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import React, {ReactElement} from 'react'
import ButtonLink from '@/components/ui/ButtonLink'
import { useRouter } from 'next/router'
import { NextPageWithLayout } from '@/utils/types'
import Auth from '@/components/common/Auth'
import { removeToken } from '@/utils/jwt'
import { useQueryClient } from 'react-query'

const SignOut: NextPageWithLayout = () => {
  const router = useRouter()
	const queryClient = useQueryClient()

  const handleSignOut = () => {
    removeToken()
		queryClient.removeQueries()
    router.push('/signin')
  }

  return (
    <Box sx={{ width: '100vw', height: '100vh', display: 'grid', placeItems: 'center' }}>
      <Stack spacing={4} alignItems="center">
        <Typography component="h1" variant="h5">
          Apakah anda yakin ingin keluar?
        </Typography>
        <Stack direction="row" spacing={2}>
          <ButtonLink variant="text" size="small" color="inherit" href="/u">
            Batal
          </ButtonLink>
          <Button variant="contained" size="small" color="error" onClick={handleSignOut}>
            Ya
          </Button>
        </Stack>
      </Stack>
    </Box>
  )
}

SignOut.auth = function auth(page: ReactElement) {
  return <Auth role="ROLE_USER">{page}</Auth>
}

export default SignOut
