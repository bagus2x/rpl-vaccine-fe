import UserLayout from '@/components/common/UserLayout'
import { ArticleResponse, getArticleById } from '@/hooks/query/article-by-id'
import humanDate from '@/utils/human-date'
import { NextPageWithLayout } from '@/utils/types'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { GetServerSideProps } from 'next'
import React, { ReactElement } from 'react'

interface ArticleProps {
  article?: ArticleResponse
}

const Article: NextPageWithLayout<ArticleProps> = ({ article }) => {
  if (!article) {
    return <Container>Not Found</Container>
  }

  return (
    <Container
      disableGutters
      component={Stack}
      sx={{
        p: { xs: 1, md: 3 }
      }}
    >
      <div>
        <Typography component="h1" variant="h4">
          {article.title}
        </Typography>
        <Typography variant="caption">{humanDate(article.createdAt)}</Typography>
      </div>
      <Box dangerouslySetInnerHTML={{ __html: article.content }} />
    </Container>
  )
}

Article.getLayout = function (page: ReactElement) {
  return <UserLayout>{page}</UserLayout>
}

export const getServerSideProps: GetServerSideProps<ArticleProps> = async (ctx) => {
  const { articleId } = ctx.query
  const aId = parseInt(articleId as string)

  if (isNaN(aId)) {
    return {
      props: {}
    }
  }

  try {
    const article = await getArticleById(aId)()
    return {
      props: {
        article
      }
    }
  } catch (error) {
    return {
      props: {}
    }
  }
}

export default Article
