import ArticleCard from '@/components/user-index/ArticleCard'
import { Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'
import React from 'react'

interface ArticlesProps {
  articles?: Array<{ id: number; picture?: string; title: string; content: string; createdAt: number }>
}

const Articles = ({ articles }: ArticlesProps) => {
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
        {articles?.map((article) => (
          <ArticleCard
            key={article.id}
            id={article.id}
            picture={article.picture}
            title={article.title}
            content={article.content}
            createdAt={article.createdAt}
          />
        ))}
      </Stack>
    </Box>
  )
}

export default Articles
