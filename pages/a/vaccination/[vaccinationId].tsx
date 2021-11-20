import AdminLayout from '@/components/common/AdminLayout'
import useParticipantsyVaccinationId from '@/hooks/query/participants-by-vaccination-id'
import useVaccionationById from '@/hooks/query/vaccination-by-id'
import { NextPageWithLayout } from '@/utils/types'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import humanDate from '@/utils/human-date'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

const VaccinationDetail: NextPageWithLayout = () => {
  const router = useRouter()
  const participants = useParticipantsyVaccinationId(parseInt(router.query.vaccinationId as string))
  const vaccination = useVaccionationById(parseInt(router.query.vaccinationId as string))

  const handleStatusChange = (participantId: number) => (ev: SelectChangeEvent) => {}

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
                      size="small"
                      onChange={handleStatusChange(participant.id)}
                    >
                      <MenuItem disabled={participant.status === 'CANCELED'} value="ACCEPTED">ACCEPTED</MenuItem>
                      <MenuItem disabled={participant.status === 'CANCELED'} value="REJECTED">REJECTED</MenuItem>
                      <MenuItem disabled value="CANCELED">CANCELED</MenuItem>
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
