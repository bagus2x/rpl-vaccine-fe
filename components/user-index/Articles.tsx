import ArticleCard from '@/components/user-index/ArticleCard'
import { Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import React from 'react'

const Articles = () => {
  return (
    <Box>
      <Typography
        variant="h5"
        component="h1"
        sx={{
          mb: 3
        }}
      >
        Informasi dan pengetahuan
      </Typography>
      <Stack
        spacing={4}
        sx={{
          scrollBehavior: 'smooth'
        }}
      >
        {Array.from(Array(10).keys()).map((_, i) => (
          <ArticleCard key={i} />
        ))}
      </Stack>
    </Box>
  )
}

export default Articles
