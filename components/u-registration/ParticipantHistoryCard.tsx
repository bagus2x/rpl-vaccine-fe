import useCancelParticipant from '@/hooks/query/cancel-participant'
import { Status } from '@/hooks/query/participants'
import { isWebResponse } from '@/utils/web-response'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import moment from 'moment'
import { useSnackbar } from 'notistack'
import React from 'react'
import { useQueryClient } from 'react-query'
import ParticipantStatus from './ParticipantStatus'

interface ParticipantHistoryCardProps {
  id: number
  vaccination: {
    id: number
    title: string
    vaccine: string
    description?: string
    picture?: string
    startDate: number
    lastDate: number
  }
  status: Status
  createdAt: number
}

const humanDate = (epoch: number) => {
  return moment(epoch).format('DD MMM YYYY HH:mm')
}

const ParticipantHistoryCard = ({ id, vaccination, status, createdAt }: ParticipantHistoryCardProps) => {
  const theme = useTheme()
  const cancelParticipant = useCancelParticipant()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const errorSnackbar = (msg: string) => {
    enqueueSnackbar(msg, { variant: 'error', preventDuplicate: true, autoHideDuration: 3000 })
  }

  const handleCancel = () => {
    cancelParticipant.mutate(id, {
      onError: (e: any) => {
        if (isWebResponse(e)) {
          errorSnackbar(e.response?.data.data ?? 'Terjadi kesalahan')
          return
        }
        errorSnackbar('Terjadi kesalahan')
      },
      onSuccess: () => {
        queryClient.invalidateQueries('PARTICIPANTS')
      }
    })
  }

  return (
    <Stack
      sx={{
        boxShadow: theme.shadows[1],
        borderRadius: 2,
        p: 2
      }}
      spacing={2}
    >
      <Typography variant="h6">{vaccination.title}</Typography>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell variant="head">ID</TableCell>
            <TableCell>{id}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Vaksin</TableCell>
            <TableCell>{vaccination.vaccine}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Deskripsi</TableCell>
            <TableCell>{vaccination.description}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Waktu</TableCell>
            <TableCell>
              {humanDate(vaccination.startDate)} - {humanDate(vaccination.lastDate)}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Status</TableCell>
            <TableCell>
							<ParticipantStatus status={status}>
							{status}
							</ParticipantStatus>
						</TableCell>
          </TableRow>
          <TableRow>
            <TableCell variant="head">Waktu pendaftaran</TableCell>
            <TableCell>{humanDate(createdAt)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button
        size="small"
        color="error"
        disabled={status === 'CANCELED'}
        sx={{
          alignSelf: 'flex-end'
        }}
        onClick={handleCancel}
      >
        Batal
      </Button>
    </Stack>
  )
}

export default ParticipantHistoryCard
