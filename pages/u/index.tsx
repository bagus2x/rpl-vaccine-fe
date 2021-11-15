import UserLayout from '@/components/common/UserLayout'
import AlertUpdate from '@/components/user-index/AlertUpdate'
import Articles from '@/components/user-index/Articles'
import { NextPageWithLayout } from '@/utils/types'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'

import React, { ReactElement } from 'react'

const U: NextPageWithLayout = () => {
  
  return (
    <Container component={Stack} spacing={4} maxWidth="lg" disableGutters>
      <AlertUpdate />
      <Articles />
    </Container>
  )
}

U.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>
}

export default U
