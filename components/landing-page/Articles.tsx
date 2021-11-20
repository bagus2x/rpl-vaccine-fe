import useDraggableScroll from '@/hooks/draggable-scroll'
import { Button, Divider, Stack } from '@mui/material'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import ArticleCard from './ArticleCard'
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import ButtonLink from '../ui/ButtonLink'

interface FirstAndLastArticleIndicatorProps {
  visible: boolean
  disableGutters: boolean
}

const FirstArticleIndicator = ({ visible, disableGutters }: FirstAndLastArticleIndicatorProps) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        position: 'absolute',
        left: {
          xs: disableGutters ? 0 : 16,
          sm: disableGutters ? 0 : 24
        },
        top: 0,
        width: { xs: 50, md: 100 },
        height: 250,
        transition: theme.transitions.create(['opacity'], {
          duration: theme.transitions.duration.complex
        }),
        background: `linear-gradient(to right, ${theme.palette.background.default}, transparent)`,
        opacity: visible ? 0.3 : 0
      }}
    />
  )
}

const LastArticleIndicator = ({ visible, disableGutters }: FirstAndLastArticleIndicatorProps) => {
  const theme = useTheme()

  return (
    <Box
      sx={{
        position: 'absolute',
        right: {
          xs: disableGutters ? 0 : 16,
          sm: disableGutters ? 0 : 24
        },
        top: 0,
        width: { xs: 50, md: 100 },
        height: 250,
        transition: theme.transitions.create(['opacity'], {
          duration: theme.transitions.duration.complex
        }),
        background: `linear-gradient(to left, ${theme.palette.background.default}, transparent)`,
        opacity: visible ? 0.3 : 0
      }}
    />
  )
}

const Articles = () => {
  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))
  const { containerRef, onMouseDown } = useDraggableScroll<HTMLDivElement>()
  const { ref: firstArticleRef, inView: inViewFirstArticle } = useInView({ threshold: 1 })
  const { ref: lastArticleRef, inView: inViewLastArticle } = useInView({ threshold: 1 })

  return (
    <Box
      sx={{
        mt: { xs: 4, md: 12 }
      }}
    >
      <Container maxWidth="xl">
        <Typography id="information" variant="h4">
          Informasi Dan Pengetahuan
        </Typography>
      </Container>
      <Container
        maxWidth="xl"
        disableGutters={mdDown}
        sx={{
          position: 'relative'
        }}
      >
        <Box
          onMouseDown={onMouseDown}
          component="div"
          ref={containerRef}
          sx={{
            width: '100%',
            maxWidth: 'xl',
            whiteSpace: 'nowrap',
            overflowX: 'scroll',
            fontSize: 0,
            mt: 2,
            scrollbarWidth: 'none',
            '& > *:not(:last-child)': {
              mr: 2
            },
            '& > *:first-of-type': {
              ml: { xs: 2, sm: 3, md: 0 }
            },
            '& > *:last-child': {
              mr: { xs: 2, sm: 3, md: 0 }
            }
          }}
        >
          {Array.from(Array(10).keys()).map((_, i) => {
            if (i === 0) return <ArticleCard key={i} ref={firstArticleRef} />
            if (i === 9) return <ArticleCard key={i} ref={lastArticleRef} />
            return <ArticleCard key={i} />
          })}
        </Box>
        <FirstArticleIndicator visible={!inViewFirstArticle} disableGutters={mdDown} />
        <LastArticleIndicator visible={!inViewLastArticle} disableGutters={mdDown} />
      </Container>
      <Container
        maxWidth="xl"
        component={Stack}
        direction="row"
        spacing={2}
        sx={{
          mt: 6,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <Divider
          sx={{
            flexGrow: 1
          }}
        />
        <ButtonLink endIcon={<ArrowForwardIosRoundedIcon />} href="/u">
          Lebih banyak
        </ButtonLink>
        <Divider
          sx={{
            flexGrow: 1
          }}
        />
      </Container>
    </Box>
  )
}

export default Articles
