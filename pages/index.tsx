import Articles from '@/components/landing-page/Articles'
import Hero from '@/components/landing-page/Hero'
import Registration from '@/components/landing-page/Registration'
import TopBar from '@/components/landing-page/TopBar'
import VaccineBenefits from '@/components/landing-page/VaccineBenefits'
import Stack from '@mui/material/Stack'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <Stack
      sx={{
        overflowX: 'hidden',
        width: '100vw',
        maxWidth: '100%',
        boxSizing: 'border-box',
        pb: 10,
        scrollBehavior: 'smooth'
      }}
    >
      <TopBar />
      <Hero />
      <Registration />
      <VaccineBenefits />
      <Articles />
    </Stack>
  )
}

export default Home
