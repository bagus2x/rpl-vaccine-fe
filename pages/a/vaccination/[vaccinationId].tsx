import AdminLayout from '@/components/common/AdminLayout'
import NotificationSenderDialog from '@/components/vaccination-detail/NotificationSenderDialog'
import useAcceptParticipant from '@/hooks/query/accept-participant'
import useParticipantsyVaccinationId, { ParticipantsResponse } from '@/hooks/query/participants-by-vaccination-id'
import useRejectParticipant from '@/hooks/query/reject-participant'
import useVaccionationById from '@/hooks/query/vaccination-by-id'
import humanDate from '@/utils/human-date'
import { NextPageWithLayout } from '@/utils/types'
import { isWebResponse } from '@/utils/web-response'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Menu from '@mui/material/Menu'
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
import React, { MouseEventHandler, ReactElement, useState } from 'react'
import { useQueryClient } from 'react-query'
const VaccinationDetail: NextPageWithLayout = () => {
  const router = useRouter()
  const participants = useParticipantsyVaccinationId(parseInt(router.query.vaccinationId as string))
  const vaccination = useVaccionationById(parseInt(router.query.vaccinationId as string))
  const [contextMenu, setContextMenu] = useState<{ mouseX: number; mouseY: number } | null>(null)
  const acceptParticipant = useAcceptParticipant()
  const rejectParticipant = useRejectParticipant()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const [participantId, setParticipantId] = useState(-1)
  const [userId, setUserId] = useState(-1)
  const [notifSenderDialog, setNotifSenderDialog] = useState(false)

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

  const handleContextMenu: (participantId: number, userId: number) => MouseEventHandler<HTMLTableRowElement> =
    (participantId: number, userId: number) => (event) => {
      event.preventDefault()
      setParticipantId(participantId)
      setUserId(userId)
      setContextMenu(
        contextMenu === null
          ? {
              mouseX: event.clientX - 2,
              mouseY: event.clientY - 4
            }
          : null
      )
    }

  const handleClose = () => {
    setContextMenu(null)
    setParticipantId(-1)
    setUserId(-1)
  }

  const handleOpenNotificationDialog = () => {
    setNotifSenderDialog(true)
  }

  const handleCloseNotificationDialog = () => {
    setNotifSenderDialog(false)
    handleClose()
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
                <TableRow
                  key={participant.id}
                  hover
                  onDoubleClick={handleContextMenu(participant.id, participant.user.id)}
                  sx={{
                    userSelect: 'none'
                  }}
                >
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
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}
      >
        <MenuItem onClick={handleClose}>Kelola</MenuItem>
        <MenuItem onClick={handleOpenNotificationDialog}>Kirim notifikasi</MenuItem>
      </Menu>
      <NotificationSenderDialog open={notifSenderDialog} onClose={handleCloseNotificationDialog} receiverId={userId} />
    </Container>
  )
}

VaccinationDetail.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default VaccinationDetail
