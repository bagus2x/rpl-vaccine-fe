import VaccinationTableHeader from '@/components/a-vaccination/VaccinationTableHeader'
import AdminLayout from '@/components/common/AdminLayout'
import useDeleteVaccination from '@/hooks/query/delete-vaccination'
import useVaccinations, { VaccinationsResponse } from '@/hooks/query/vaccinations'
import { NextPageWithLayout } from '@/utils/types'
import { isWebResponse } from '@/utils/web-response'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import moment from 'moment'
import Link from 'next/link'
import { useSnackbar } from 'notistack'
import React, { MouseEventHandler, ReactElement, useState } from 'react'
import { useQueryClient } from 'react-query'

const humanDate = (epoch: number) => {
  return moment(epoch).format('DD MMM YYYY HH:mm')
}

const Vaccinations: NextPageWithLayout = () => {
  const vaccinations = useVaccinations()
  const [contextMenu, setContextMenu] = useState<{ mouseX: number; mouseY: number } | null>(null)
  const [id, setId] = useState(-1)
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()
  const deleteVaccination = useDeleteVaccination()

  const errorSnackbar = (msg: string) => {
    enqueueSnackbar(msg, { variant: 'error', preventDuplicate: true, autoHideDuration: 3000 })
  }

  const handleContextMenu: (articleId: number) => MouseEventHandler<HTMLTableRowElement> =
    (articleId: number) => (event) => {
      event.preventDefault()
      setId(articleId)
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
    setId(-1)
  }

  const handleDelete = () => {
    deleteVaccination.mutate(id, {
      onSuccess: async (_data, req) => {
        queryClient.setQueryData('VACCINATIONS', (old) =>
          (old as VaccinationsResponse).filter((vaccination) => vaccination.id !== req)
        )
      },
      onError: (e: any) => {
        if (isWebResponse(e)) {
          errorSnackbar(e.response?.data.data ?? 'Terjadi kesalahan')
          return
        }
        errorSnackbar('Terjadi kesalahan')
      },
      onSettled: () => {
        handleClose()
      }
    })
  }

  return (
    <Box
      sx={{
        p: { xs: 1, md: 3 }
      }}
    >
      <Container component={Paper} disableGutters>
        <VaccinationTableHeader />
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="articles">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Vaksin</TableCell>
                <TableCell align="right">Jumlah Peserta</TableCell>
                <TableCell align="right">Tanggal Dibuat</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {vaccinations.data?.map((vaccination) => (
                <TableRow
                  key={vaccination.id}
                  hover
                  onDoubleClick={handleContextMenu(vaccination.id)}
                  component="tr"
                  sx={{ userSelect: 'none' }}
                >
                  <TableCell>{vaccination.id}</TableCell>
                  <TableCell>{vaccination.title}</TableCell>
                  <TableCell>{vaccination.vaccine}</TableCell>
                  <TableCell align="right">{vaccination.numberOfParticipants}</TableCell>
                  <TableCell align="right">{humanDate(vaccination.updatedAt)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
      <Menu
        open={contextMenu !== null}
        onClose={handleClose}
        anchorReference="anchorPosition"
        anchorPosition={contextMenu !== null ? { top: contextMenu.mouseY, left: contextMenu.mouseX } : undefined}
      >
        <Link passHref href={`/a/vaccination/${id}`}>
          <MenuItem onClick={handleClose}>Kelola</MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>Sunting</MenuItem>
        <MenuItem onClick={handleDelete}>Hapus</MenuItem>
      </Menu>
    </Box>
  )
}

Vaccinations.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default Vaccinations
