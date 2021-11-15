import UserLayout from '@/components/common/UserLayout'
import { NextPageWithLayout } from '@/utils/types'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import React, { ReactElement } from 'react'

const VaccinationCard = () => {
  const theme = useTheme()
  return (
    <Box
      sx={{
        boxShadow: theme.shadows[1],
        borderRadius: 2,
        p: 4
      }}
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium quia minus incidunt. In quod maiores neque!
      Voluptate minima aspernatur pariatur quia voluptatem veritatis eligendi quisquam? A expedita ullam sequi
      architecto.
    </Box>
  )
}

const VaccinationSchedule: NextPageWithLayout = () => {
  return (
    <Container component={Stack}>
      <Box>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            mb: 3
          }}
        >
          Daftar vaksinasi
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2
          }}
        >
          <VaccinationCard />
          <VaccinationCard />
          <VaccinationCard />
          <VaccinationCard />
          <VaccinationCard />
          <VaccinationCard />
          <VaccinationCard />
        </Box>
      </Box>
    </Container>
  )
}

VaccinationSchedule.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>
}

export default VaccinationSchedule
