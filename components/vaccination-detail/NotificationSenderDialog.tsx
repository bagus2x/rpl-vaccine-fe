import React from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import useSendNotification from '@/hooks/query/send-notification'
import { useSnackbar } from 'notistack'
import { Controller, useForm } from 'react-hook-form'
import Switch from '@mui/material/Switch'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import { isWebResponse } from '@/utils/web-response'

interface NotificationSenderProps {
  open: boolean
  onClose: () => void
  receiverId: number
}

interface NotifFormField {
  title: string
  content?: string
  email: boolean
}

const NotificationSenderDialog = ({ open, onClose, receiverId }: NotificationSenderProps) => {
  const sendNotif = useSendNotification()
  const { enqueueSnackbar } = useSnackbar()
  const { register, handleSubmit, control,reset } = useForm<NotifFormField>()

  const errorSnackbar = (msg: string) => {
    enqueueSnackbar(msg, { variant: 'error', preventDuplicate: true, autoHideDuration: 3000 })
  }

  const handleSend = handleSubmit((data) => {
    sendNotif.mutate(
      {
        title: data.title,
        content: data.content,
        email: data.email,
        receiverId
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
          enqueueSnackbar('Berhasil mengirim notifikasi', { autoHideDuration: 3000 })
          handleClose()
        }
      }
    )
  })

  const handleClose = () => {
    reset()
    onClose()
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <form action="">
        <DialogTitle>Kirim</DialogTitle>
        <DialogContent>
          <DialogContentText>Mengirim ke peserta vaksinasi</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Judul"
            fullWidth
            size="small"
            {...register('title', {
              required: 'Judul harus diisi',
              minLength: {
                value: 5,
                message: 'Panjang minimal 5 karakter'
              }
            })}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Konten"
            fullWidth
            size="small"
            {...register('content')}
          />
          <Controller
            control={control}
            name="email"
            defaultValue={false}
            render={({ field }) => (
              <FormGroup>
                <FormControlLabel control={<Switch {...field} defaultChecked={false} />} label="kirim ke email" />
              </FormGroup>
            )}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Batal</Button>
          <Button onClick={handleSend}>Kirim</Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default NotificationSenderDialog
