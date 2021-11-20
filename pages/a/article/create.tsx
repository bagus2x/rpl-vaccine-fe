import AdminLayout from '@/components/common/AdminLayout'
import useCreateArticle from '@/hooks/query/create-article'
import useUser from '@/hooks/query/user'
import { NextPageWithLayout } from '@/utils/types'
import { isWebResponse } from '@/utils/web-response'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useSnackbar } from 'notistack'
import React, { ChangeEvent, ReactElement, useState } from 'react'

const RichTextEditor = dynamic(() => import('@/components/a-article/RichTextEditor'), { ssr: false })

const CreateArticle: NextPageWithLayout = () => {
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const createArticle = useCreateArticle()
  const user = useUser()
  const { enqueueSnackbar } = useSnackbar()
  const router = useRouter()

  const errorSnackbar = (msg: string) => {
    enqueueSnackbar(msg, { variant: 'error', preventDuplicate: true, autoHideDuration: 3000 })
  }

  const handleTitleChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setTitle(ev.target.value)
  }

  const handleSave = () => {
    createArticle.mutate(
      {
        authorId: user.data?.id as number,
        content,
        title
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
        <Button
          size="small"
          color="primary"
          variant="contained"
          disableElevation
          onClick={handleSave}
          disabled={createArticle.isLoading || !user.isSuccess}
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
