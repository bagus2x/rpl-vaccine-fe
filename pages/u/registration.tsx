import UserLayout from '@/components/common/UserLayout'
import useRegisterParticipant from '@/hooks/query/register-participant'
import useUser from '@/hooks/query/user'
import useVaccinations, { getVaccinations, VaccinationsResponse } from '@/hooks/query/vaccinations'
import { NextPageWithLayout } from '@/utils/types'
import { isWebResponse } from '@/utils/web-response'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import moment from 'moment'
import { GetStaticProps } from 'next'
import { useSnackbar } from 'notistack'
import React, { ReactElement } from 'react'

interface VaccinationCardProps {
  id: number
  title: string
  vaccine: string
  description: string | null
  picture: string | null
  startDate: number
  lastDate: number
}

const humanDate = (epoch: number) => {
  return moment(epoch).format('DD MMM YYYY HH:mm')
}

const VaccinationCard = ({ id, title, vaccine, description, picture, startDate, lastDate }: VaccinationCardProps) => {
  const theme = useTheme()
  const registerParticipant = useRegisterParticipant()
  const user = useUser()
  const { enqueueSnackbar } = useSnackbar()

  const errorSnackbar = (msg: string) => {
    enqueueSnackbar(msg, { variant: 'error', preventDuplicate: true, autoHideDuration: 3000 })
  }

  const handleRegister = () => {
    registerParticipant.mutate(
      {
        userId: user.data?.id as number,
        vaccinationId: id
      },
      {
        onError: (e: any) => {
          if (isWebResponse(e)) {
            errorSnackbar(e.response?.data.data ?? 'Terjadi kesalahan')
            return
          }
          errorSnackbar('Terjadi kesalahan')
        },
        onSuccess: () => {
          enqueueSnackbar('Berhasil mendaftar')
        }
      }
    )
  }

  return (
    <Box
      sx={{
        boxShadow: theme.shadows[1],
        borderRadius: 2,
        p: 2,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0
      }}
    >
      <Typography
        variant="h6"
        component="h2"
        sx={{
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          whiteSpace: 'nowrap'
        }}
      >
        {title}
      </Typography>
      <Typography variant="caption">
        <b>{vaccine}</b> | {humanDate(startDate)} - {humanDate(lastDate)}
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Typography variant="body1">{description}</Typography>
      <Button size="small" sx={{ alignSelf: 'flex-end' }} onClick={handleRegister} disabled={!user.isSuccess}>
        Daftar
      </Button>
    </Box>
  )
}

interface RegistrationProps {
  vaccinations: VaccinationsResponse
}

const Registration: NextPageWithLayout<RegistrationProps> = ({ vaccinations: initialVaccinations }) => {
  const vaccinations = useVaccinations(initialVaccinations)

  return (
    <Container component={Stack} disableGutters p={2}>
      <Box>
        <Typography
          component="h1"
          variant="h5"
          sx={{
            mb: 3
          }}
        >
          Pendaftaran vaksinasi
        </Typography>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2
          }}
        >
          {vaccinations.data?.map((vcn) => (
            <VaccinationCard
              key={vcn.id}
              id={vcn.id}
              title={vcn.title}
              vaccine={vcn.vaccine}
              description={vcn.description}
              picture={vcn.picture}
              startDate={vcn.startDate}
              lastDate={vcn.lastDate}
            />
          ))}
        </Box>
      </Box>
    </Container>
  )
}

export const getStaticProps: GetStaticProps<RegistrationProps> = async () => {
  const vaccinations = await getVaccinations()

  return {
    props: {
      vaccinations
    },
    revalidate: 10
  }
}

Registration.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>
}

export default Registration
