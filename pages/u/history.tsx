import UserLayout from '@/components/common/UserLayout'
import ParticipantHistories from '@/components/u-registration/ParticipantHistories'
import useParticipants from '@/hooks/query/participants'
import { NextPageWithLayout } from '@/utils/types'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import React, { ReactElement } from 'react'



const History: NextPageWithLayout = () => {
  const participants = useParticipants()

  return (
    <Container component={Stack} disableGutters p={2}>
      <ParticipantHistories />
    </Container>
  )
}

History.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>
}

export default History
