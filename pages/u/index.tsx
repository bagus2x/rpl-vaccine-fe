import Auth from '@/components/common/Auth'
import UserLayout from '@/components/common/UserLayout'
import AlertUpdate from '@/components/user-index/AlertUpdate'
import Articles from '@/components/user-index/Articles'
import { getArticles, ArticlesResponse } from '@/hooks/query/articles'
import { NextPageWithLayout } from '@/utils/types'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { GetStaticProps } from 'next'

import React, { ReactElement } from 'react'

interface UProps {
  articles: ArticlesResponse
}

const U: NextPageWithLayout<UProps> = ({articles}) => {

  return (
    <Container component={Stack} spacing={4} maxWidth="lg" disableGutters p={2}>
      <AlertUpdate />
      <Articles articles={articles} />
    </Container>
  )
}

U.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>
}

U.auth = function auth(page: ReactElement) {
  return <Auth role="ALL">{page}</Auth>
}

export const getStaticProps: GetStaticProps<UProps> = async () => {
  const articles = await getArticles()

  return {
    props: {
      articles
    },
    revalidate: 1800
  }
}

export default U
