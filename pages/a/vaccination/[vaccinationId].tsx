import AdminLayout from '@/components/common/AdminLayout'
import useAcceptParticipant from '@/hooks/query/accept-participant'
import useParticipantsyVaccinationId, { ParticipantsResponse } from '@/hooks/query/participants-by-vaccination-id'
import useRejectParticipant from '@/hooks/query/reject-participant'
import useVaccionationById from '@/hooks/query/vaccination-by-id'
import humanDate from '@/utils/human-date'
import { NextPageWithLayout } from '@/utils/types'
import { isWebResponse } from '@/utils/web-response'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Stack from '@mui/material/Stack'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React, { ReactElement } from 'react'
import { useQueryClient } from 'react-query'

const VaccinationDetail: NextPageWithLayout = () => {
  const router = useRouter()
  const participants = useParticipantsyVaccinationId(parseInt(router.query.vaccinationId as string))
  const vaccination = useVaccionationById(parseInt(router.query.vaccinationId as string))
  const acceptParticipant = useAcceptParticipant()
  const rejectParticipant = useRejectParticipant()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const errorSnackbar = (msg: string) => {
    enqueueSnackbar(msg, { variant: 'error', preventDuplicate: true, autoHideDuration: 3000 })
  }

  const handleStatusChange = (participantId: number) => (ev: SelectChangeEvent) => {
    const status = ev.target.value
    if (status === 'ACCEPTED') {
      acceptParticipant.mutate(participantId, {
        onError: (e: any) => {
          if (isWebResponse(e)) {
            errorSnackbar(e.response?.data.data ?? 'Terjadi kesalahan')
            return
          }
          errorSnackbar('Terjadi kesalahan')
        },
        onSuccess: (_data, req) => {
          queryClient.setQueryData(
            ['PARTICIPANTS_BY_VACCINATION_ID', parseInt(router.query.vaccinationId as string)],
            (old) =>
              (old as ParticipantsResponse).map((participant) =>
                participant.id === req
                  ? {
                      ...participant,
                      status: 'ACCEPTED'
                    }
                  : participant
              )
          )
        }
      })
      return
    }
    if (status === 'REJECTED') {
      rejectParticipant.mutate(participantId, {
        onError: (e: any) => {
          if (isWebResponse(e)) {
            errorSnackbar(e.response?.data.data ?? 'Terjadi kesalahan')
            return
          }
          errorSnackbar('Terjadi kesalahan')
        },
        onSuccess: (_data, req) => {
          queryClient.setQueryData(
            ['PARTICIPANTS_BY_VACCINATION_ID', parseInt(router.query.vaccinationId as string)],
            (old) =>
              (old as ParticipantsResponse).map((participant) =>
                participant.id === req
                  ? {
                      ...participant,
                      status: 'REJECTED'
                    }
                  : participant
              )
          )
        }
      })
    }
  }

  return (
    <Container component={Stack} disableGutters sx={{ p: { xs: 1, md: 3 } }} spacing={4}>
      <Box>
        <Typography component="h1" variant="h5">
          {vaccination.data?.title}
        </Typography>
        <Typography variant="caption">
          {humanDate(vaccination.data?.startDate as number)} - {humanDate(vaccination.data?.lastDate as number)}
        </Typography>
        <Typography variant="body1" mt={1}>
          {vaccination.data?.numberOfParticipants} Pendaftar
        </Typography>
      </Box>
      <Box sx={{ pt: 1 }}>
        <Typography component="h1" variant="h5">
          Peserta
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nama</TableCell>
                <TableCell>Tanggal Pendaftaran</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {participants.data?.map((participant) => (
                <TableRow key={participant.id}>
                  <TableCell>{participant.id}</TableCell>
                  <TableCell>{participant.user.name}</TableCell>
                  <TableCell>{humanDate(participant.createdAt)}</TableCell>
                  <TableCell width={200}>
                    <Select
                      labelId="select-status"
                      id="select-status"
                      fullWidth
                      defaultValue={participant.status}
                      value={participant.status}
                      size="small"
                      onChange={handleStatusChange(participant.id)}
                    >
                      <MenuItem disabled={participant.status === 'CANCELED'} value="ACCEPTED">
                        ACCEPTED
                      </MenuItem>
                      <MenuItem disabled={participant.status === 'CANCELED'} value="REJECTED">
                        REJECTED
                      </MenuItem>
                      <MenuItem disabled value="CANCELED">
                        CANCELED
                      </MenuItem>
                      <MenuItem disabled value="WAITING">
                        WAITING
                      </MenuItem>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  )
}

VaccinationDetail.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default VaccinationDetail
