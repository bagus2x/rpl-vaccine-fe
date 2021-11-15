import { loremBody, loremTitle } from '@/utils/lorem'
import { truncate } from '@/utils/truncate'
import { Box, Divider, Stack, Typography, useMediaQuery, useTheme } from '@mui/material'
import React from 'react'
import ButtonLink from '@/components/ui/ButtonLink'
import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded'

const ArticleCard = () => {
  const theme = useTheme()
  const xsUp = useMediaQuery(theme.breakpoints.up('xs'))
  const smUp = useMediaQuery(theme.breakpoints.up('sm'))
  const mdUp = useMediaQuery(theme.breakpoints.up('md'))
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'))

  const getTruuncatedString = (str: string) => {
    if (lgUp) return truncate(str, 400)
    if (mdUp) return truncate(str, 320)
    if (smUp) return truncate(str, 240)
    if (xsUp) return truncate(str, 100)
    return str
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
            mr: { xs: 1, md: 2 }
          }}
        ></Box>
        <Typography
          variant="h6"
          sx={{
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            gridArea: 'title'
          }}
        >
          {loremTitle}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            gridArea: 'body',
            textAlign: 'justify'
          }}
        >
          {getTruuncatedString(loremBody)}
        </Typography>
        <Stack
          direction="row"
          spacing={1}
          sx={{
            gridArea: 'info',
            boxSizing: 'border-box'
          }}
        >
          <Stack direction="row" spacing={0.5} alignItems="center">
            <AccessTimeRoundedIcon fontSize="small" />
            <Typography variant="caption">1 h</Typography>
          </Stack>
          <Divider
            orientation="vertical"
            sx={{
              boxSizing: 'border-box',
              height: 18,
              alignSelf: 'center'
            }}
          />
          <ButtonLink
            href="/u/articles"
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
