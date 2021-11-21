import { loremBody, loremTitle } from '@/utils/lorem'
import { truncate } from '@/utils/truncate'
import { alpha, Box, Divider, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import ButtonLink from '@/components/ui/ButtonLink'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'
import Image from 'next/image'
import moment from 'moment'

interface ArticleCardProps {
  id: number
  picture?: string
  title: string
  content: string
  createdAt: number
}

const ArticleCard = ({ id, picture, title, content, createdAt }: ArticleCardProps) => {
  const theme = useTheme()
  const xsUp = useMediaQuery(theme.breakpoints.up('xs'))
  const smUp = useMediaQuery(theme.breakpoints.up('sm'))
  const mdUp = useMediaQuery(theme.breakpoints.up('md'))
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'))

  const getTruuncatedString = (str: string) => {
    const body = str.replace(/<[^>]+>/g, '')
    if (lgUp) return truncate(body, 400)
    if (mdUp) return truncate(body, 320)
    if (smUp) return truncate(body, 240)
    if (xsUp) return truncate(body, 100)
    return body
  }

  const humanDate = (epoch: number) => {
    return moment(epoch).fromNow()
  }

  return (
    <Box
      sx={{
        position: 'relative',
        '&:hover > *:first-of-type': {
          opacity: 0.07
        }
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          padding: 1,
          boxSizing: 'content-box',
          background: theme.palette.primary.main,
          opacity: 0,
          borderRadius: 3,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          transition: theme.transitions.create(['opacity'], {
            duration: theme.transitions.duration.enteringScreen,
            easing: theme.transitions.easing.easeIn
          })
        }}
      ></Box>
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: 'auto 1fr',
          gridTemplateAreas: `"image title" "image body" "image info"`,
          gridTemplateRows: 'auto 1fr auto'
        }}
      >
        <Box
          sx={{
            width: { xs: 120, md: 150 },
            height: { xs: 120, md: 150 },
            bgcolor: 'gray',
            gridArea: 'image',
            borderRadius: 3,
            mr: { xs: 1, md: 2 },
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Image
            draggable={false}
            src={picture || '/assets/image/Depositphotos_336730000_l-2015.jpg'}
            layout="fill"
            objectFit="cover"
          />
          {!smUp && (
            <Stack
              direction="row"
              spacing={0.5}
              alignItems="center"
              sx={{
                position: 'absolute',
                left: 0,
                bottom: 0,
                color: '#fff',
                width: '100%',
                p: 0.5,
                background: {xs: `linear-gradient(to top, black, transparent)`, md: 'transparent'}
              }}
            >
              <AccessTimeRoundedIcon fontSize="small" color="inherit" />
              <Typography variant="caption" color="inherit">
                {humanDate(createdAt)}
              </Typography>
            </Stack>
          )}
        </Box>
        <Typography
          variant="h6"
          sx={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            gridArea: 'title'
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            gridArea: 'body',
            textAlign: 'justify'
          }}
        >
          {getTruuncatedString(content)}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            gridArea: 'info',
            boxSizing: 'border-box'
          }}
        >
          {smUp && (
            <>
              <Stack direction="row" spacing={0.5} alignItems="center">
                <AccessTimeRoundedIcon fontSize="small" />
                <Typography variant="caption">{humanDate(createdAt)}</Typography>
              </Stack>
              <Divider
                orientation="vertical"
                sx={{
                  boxSizing: 'border-box',
                  height: 18,
                  alignSelf: 'center'
                }}
              />
            </>
          )}
          <ButtonLink
            href={`/u/article/${id}`}
            size="small"
            sx={{
              p: 0.5
            }}
          >
            Baca lebih lanjut
          </ButtonLink>
        </Stack>
      </Box>
    </Box>
  )
}

export default ArticleCard
