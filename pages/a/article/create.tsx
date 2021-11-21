import AdminLayout from '@/components/common/AdminLayout'
import useCreateArticle from '@/hooks/query/create-article'
import useUploadImage from '@/hooks/query/upload-image'
import useUser from '@/hooks/query/user'
import { NextPageWithLayout } from '@/utils/types'
import { isWebResponse } from '@/utils/web-response'
import CropOriginalRoundedIcon from '@mui/icons-material/CropOriginalRounded'
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import ButtonBase from '@mui/material/ButtonBase'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { alpha, useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React, { ChangeEvent, ReactElement, useState } from 'react'

const RichTextEditor = dynamic(() => import('@/components/a-article/RichTextEditor'), { ssr: false })

const CreateArticle: NextPageWithLayout = () => {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [imageFIle, setImageFile] = useState<File | null>(null)
  const [imageUrl, setImageUrl] = useState('')
  const createArticle = useCreateArticle()
  const user = useUser()
  const router = useRouter()
  const theme = useTheme()
  const { enqueueSnackbar } = useSnackbar()
  const uploadImage = useUploadImage()

  const errorSnackbar = (msg: string) => {
    enqueueSnackbar(msg, { variant: 'error', preventDuplicate: true, autoHideDuration: 3000 })
  }

  const handleTitleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setTitle(ev.target.value)
  }

  const handleImageChange = (ev: ChangeEvent<HTMLInputElement>) => {
    const files = ev.target.files
    if (!files || !files[0]) return

    setImageFile(files[0])

    const fileReader = new FileReader()
    fileReader.readAsDataURL(files[0])
    fileReader.onload = (e) => {
      if (e.target?.result) {
        setImageUrl(e.target?.result as string)
      }
    }
  }

  const handleDeletePreview = () => {
    setImageUrl('')
    setImageFile(null)
  }

  const handleSave = () => {
    uploadImage.mutate(
      {
        folder: 'article',
        file: imageFIle as File
      },
      {
        onSuccess: (secure_url) => {
          createArticle.mutate(
            {
              authorId: user.data?.id as number,
              content,
              title,
              picture: secure_url
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
                enqueueSnackbar('Artikel berhasil ditambahkan')
                router.push('/a/article')
              }
            }
          )
        },
        onError: (e: any) => {
          errorSnackbar('Gagal menunggah thumbnail')
        }
      }
    )
  }

  return (
    <Container
      maxWidth="xl"
      disableGutters
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        gap: 2,
        minWidth: 900,
        p: { xs: 1, md: 3 }
      }}
    >
      <RichTextEditor content={content} onContentChange={setContent} />
      <Stack
        spacing={2}
        sx={{
          width: 240
        }}
      >
        <TextField
          multiline
          size="small"
          variant="standard"
          label="Judul"
          InputLabelProps={{ shrink: true }}
          onChange={handleTitleChange}
          value={title}
        />
        <Box
          sx={{
            position: 'relative'
          }}
        >
          <ButtonBase
            component="label"
            sx={{
              height: 240,
              width: 240,
              borderRadius: 4,
              bgcolor: '#eee',
              display: 'grid',
              placeItems: 'center',
              cursor: 'pointer',
              overflow: 'hidden'
            }}
          >
            {imageUrl ? (
              <Box
                component="img"
                src={imageUrl}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <CropOriginalRoundedIcon fontSize="large" color="inherit" />
            )}
            <input type="file" hidden onChange={handleImageChange} />
          </ButtonBase>
          {imageUrl && (
            <IconButton
              size="small"
              onClick={handleDeletePreview}
              sx={{
                bgcolor: alpha(theme.palette.background.default, 0.8),
                position: 'absolute',
                right: -12,
                top: -12,
                color: theme.palette.text.primary
              }}
            >
              <DeleteOutlineRoundedIcon />
            </IconButton>
          )}
        </Box>
        <Button
          size="small"
          color="primary"
          variant="contained"
          disableElevation
          onClick={handleSave}
          disabled={
            createArticle.isLoading || !user.isSuccess || !imageFIle || uploadImage.isLoading || title.length <= 5
          }
        >
          Simpan
        </Button>
      </Stack>
    </Container>
  )
}

CreateArticle.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default CreateArticle
