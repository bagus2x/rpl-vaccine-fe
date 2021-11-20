import LinearProgress from '@mui/material/LinearProgress'
import Router from 'next/router'
import { useEffect, useState } from 'react'

const PageLoadingIndicator = () => {
  const [pageLoading, setPageLoading] = useState(false)

  const start = () => {
    setPageLoading(true)
  }

  const done = () => {
    setPageLoading(false)
  }

  useEffect(() => {
    Router.events.on('routeChangeStart', start)
    Router.events.on('routeChangeComplete', done)
    Router.events.on('routeChangeError', done)
  }, [])

  return pageLoading ? (
    <LinearProgress
      color="secondary"
      sx={{
        width: '100%',
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 9999999
      }}
    />
  ) : null
}

export default PageLoadingIndicator
