import ThemeProvider from '@/components/common/ThemeProvider'
import createEmotionCache from '@/utils/create-emotion-cache'
import { NextPageWithLayout } from '@/utils/types'
import { CacheProvider, EmotionCache } from '@emotion/react'
import CssBaseline from '@mui/material/CssBaseline'
import { AppProps } from 'next/app'
import Head from 'next/head'
import PropTypes from 'prop-types'
import React from 'react'
import { Hydrate, QueryClient, QueryClientProvider, setLogger } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { SnackbarProvider } from 'notistack'
import PageLoadingIndicator from '@/components/common/PageLoadingIndicator'

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
  emotionCache: EmotionCache
}

const clientSideEmotionCache = createEmotionCache()
const queryClient = new QueryClient()

export default function App(props: AppPropsWithLayout) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props
  const getLayout = Component.getLayout ?? ((page) => page)
  const auth = Component.auth ?? ((page) => page)

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools position="bottom-right" />
      <Hydrate state={pageProps.dehydratedState}>
        <CacheProvider value={emotionCache}>
          <Head>
            <title>Vaccine Maps</title>
            <meta name="viewport" content="initial-scale=1, width=device-width" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link rel="shortcut icon" href="/assets/logo_out.svg" />
            <link
              href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap"
              rel="stylesheet"
            />
          </Head>
          <ThemeProvider>
            <CssBaseline />
            <PageLoadingIndicator />
            <SnackbarProvider maxSnack={3}>{auth(<>{getLayout(<Component {...pageProps} />)}</>)}</SnackbarProvider>
          </ThemeProvider>
        </CacheProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired
}
