import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import type { NextPage } from 'next'
import React from 'react'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import HelpCenterRoundedIcon from '@mui/icons-material/HelpCenterRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded'
import Link from 'next/link'

const NotFound: NextPage = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        width: '100vw',
        height: '100vh',
        placeItems: 'center'
      }}
    >
      <Stack spacing={2} >
        <Typography component="h3" variant="h5">
          Halaman Tidak Ditemukan
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Link href="/" passHref>
            <IconButton>
              <HomeRoundedIcon />
            </IconButton>
          </Link>
          <Link href="/help" passHref>
            <IconButton>
              <HelpCenterRoundedIcon />
            </IconButton>
          </Link>
        </Stack>
      </Stack>
    </Box>
  )
}

export default NotFound
