import AdminLayout from '@/components/common/AdminLayout'
import useArticles from '@/hooks/query/articles'
import { NextPageWithLayout } from '@/utils/types'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import moment from 'moment'
import Link from 'next/link'
import React, { MouseEventHandler, ReactElement, useState } from 'react'

const humanDate = (epoch: number) => {
  return moment(epoch).format('DD MMM YYYY HH:mm')
}

const Article: NextPageWithLayout = () => {
  const articles = useArticles()
  const [contextMenu, setContextMenu] = useState<{ mouseX: number; mouseY: number } | null>(null)
  const [id, setId] = useState(-1)

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
  return (
    <Box
      sx={{
        p: { xs: 1, md: 3 }
      }}
    >
      <Container component={Paper} disableGutters>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            p: 2
          }}
        >
          <Typography component="h1" variant="h5">
            Artikel
          </Typography>
          <Link href="/a/article/create" prefetch>
            <IconButton color="primary">
              <AddRoundedIcon />
            </IconButton>
          </Link>
        </Box>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="articles">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Penulis</TableCell>
                <TableCell align="right">Tanggal Dibuat</TableCell>
                <TableCell align="right">Tanggal Diperbarui</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {articles.data?.map((article) => (
                <TableRow
                  key={article.id}
                  hover
                  onDoubleClick={handleContextMenu(article.id)}
                  component="tr"
                  sx={{ userSelect: 'none' }}
                >
                  <TableCell>{article.id}</TableCell>
                  <TableCell>{article.title}</TableCell>
                  <TableCell>{article.author.name}</TableCell>
                  <TableCell align="right">{humanDate(article.createdAt)}</TableCell>
                  <TableCell align="right">{humanDate(article.updatedAt)}</TableCell>
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
        <Link passHref href={`/u/article/${id}`}>
          <MenuItem onClick={handleClose}>Pratinjau</MenuItem>
        </Link>
        <MenuItem onClick={handleClose}>Sunting</MenuItem>
        <MenuItem onClick={handleClose}>Hapus</MenuItem>
      </Menu>
    </Box>
  )
}

Article.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>
}

export default Article
