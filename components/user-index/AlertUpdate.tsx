import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import React from 'react'
import Link from '@/components/ui/Link'
import Slide from '@mui/material/Slide'

const AlertUpdate = () => {
  return (
    <Slide in timeout={500}>
      <Alert severity="info">
        <AlertTitle>Pemberitahuan</AlertTitle>
        Lengkapi data anda untuk memanfaatkan pendaftaran vaksinasi.{' '}
        <Link variant="subtitle2" href="/u/settings">
          Perbarui
        </Link>
      </Alert>
    </Slide>
  )
}

export default AlertUpdate
