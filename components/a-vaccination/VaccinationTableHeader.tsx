import useCreateVaccination from '@/hooks/query/create-vaccination'
import { isWebResponse } from '@/utils/web-response'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import DateAdapter from '@mui/lab/AdapterMoment'
import DateTimePicker from '@mui/lab/DateTimePicker'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useQueryClient } from 'react-query'

interface CreateVaccinationField {
  title: string
  vaccine: string
  description?: string
  startDate: Date | null
  lastDate: Date | null
}

const VaccinationTableHeader = () => {
  const [openDialog, setOpenDialog] = useState(false)
  const createVacinnation = useCreateVaccination()
  const {
    handleSubmit,
    control,
    register,
    reset,
    setValue,
    formState: { errors }
  } = useForm<CreateVaccinationField>()
  const { enqueueSnackbar } = useSnackbar()
  const queryClient = useQueryClient()

  const handleOpenDialog = () => {
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    reset()
    setValue('startDate', null)
    setValue('lastDate', null)
  }

  const errorSnackbar = (msg: string) => {
    enqueueSnackbar(msg, { variant: 'error', preventDuplicate: true, autoHideDuration: 3000 })
  }

  const handleCreate = handleSubmit((data) => {
    createVacinnation.mutate(
      {
        title: data.title,
        vaccine: data.vaccine,
        description: data.description,
        startDate: new Date(data.startDate as Date).getTime(),
        lastDate: new Date(data.lastDate as Date).getTime()
      },
      {
        onError: (e) => {
          if (isWebResponse(e)) {
            errorSnackbar(e.response?.data.data ?? 'Terjadi kesalahan')
            return
          }
          errorSnackbar('Terjadi kesalahan')
        },
        onSuccess: () => {
          enqueueSnackbar(`${data.title} berhasil dibuat`, { variant: 'success' })
          handleCloseDialog()
          queryClient.invalidateQueries('VACCINATIONS')
        }
      }
    )
  })

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2
      }}
    >
      <Typography component="h1" variant="h5">
        Vaksinasi
      </Typography>
      <IconButton color="primary" onClick={handleOpenDialog}>
        <AddRoundedIcon />
      </IconButton>
      <Dialog open={openDialog} maxWidth="sm" fullWidth keepMounted>
        <form onSubmit={handleCreate}>
          <DialogTitle>Buat Vaksinasi</DialogTitle>
          <DialogContent>
            <Stack mt={1} spacing={2}>
              <TextField
                size="small"
                label="Judul"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                helperText={errors.title ? errors.title.message : ' '}
                error={!!errors.title}
                {...register('title', {
                  required: 'Judul wajib diisi'
                })}
              />
              <LocalizationProvider dateAdapter={DateAdapter}>
                <Controller
                  name="startDate"
                  defaultValue={null}
                  control={control}
                  rules={{
                    required: 'Tanggal akhir wajib diisi'
                  }}
                  render={({ field: { onChange, value, ref } }) => (
                    <DateTimePicker
                      onChange={onChange}
                      value={value}
                      disablePast
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Tanggal awal"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          helperText={errors.startDate ? errors.startDate.message : ' '}
                          error={!!errors.startDate}
                        />
                      )}
                    />
                  )}
                />
                <Controller
                  name="lastDate"
                  defaultValue={null}
                  control={control}
                  rules={{
                    required: 'Tanggal akhir wajib diisi'
                  }}
                  render={({ field: { onChange, value } }) => (
                    <DateTimePicker
                      onChange={onChange}
                      value={value}
                      disablePast
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Tanggal akhir"
                          fullWidth
                          InputLabelProps={{ shrink: true }}
                          helperText={errors.lastDate ? errors.lastDate.message : ' '}
                          error={!!errors.lastDate}
                        />
                      )}
                    />
                  )}
                />
              </LocalizationProvider>
              <TextField
                size="small"
                label="Vaksin"
                fullWidth
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                helperText={errors.vaccine ? errors.vaccine.message : ' '}
                error={!!errors.vaccine}
                {...register('vaccine', {
                  required: 'Vaksin wajib diisi'
                })}
              />
              <TextField
                size="small"
                label="Deskripsi"
                fullWidth
                multiline
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                {...register('description')}
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Batal</Button>
            <Button type="submit">Simpan</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Box>
  )
}

export default VaccinationTableHeader
