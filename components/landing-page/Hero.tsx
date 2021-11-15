import hero from '@/public/assets/image/hero.png'
import MailRoundedIcon from '@mui/icons-material/MailRounded'
import PhoneRoundedIcon from '@mui/icons-material/PhoneRounded'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import Image from 'next/image'

const Hero = () => {
  const theme = useTheme()
  const mdDown = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <Box
      component="section"
      sx={{
        background: theme.palette.primary.main,
        minHeight: 400,
        boxSizing: 'border-box',
        pt: { xs: 4, md: 8 },
        pb: '91px'
      }}
    >
      <Container
        maxWidth="xl"
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
          gap: 8
        }}
      >
        <Stack spacing={2}>
          <Typography
            variant="h1"
            sx={{
              ...theme.typography.h2,
              color: theme.palette.background.default,
              fontWeight: 400
            }}
          >
            Lindungi Diri Sendiri Dan Sekitar Dengan Vaksinasi COVID-19
          </Typography>
          <Typography
            variant="body1"
            textAlign="justify"
            sx={{
              color: theme.palette.background.default
            }}
          >
            Ayo berpartisipasi dalam program vaksinasi COVID-19 ini untuk melindungi anda dan keluarga. Jalankan 3M
            dengan menggunakan masker, menjaga jarak dan mecuci tangan untuk kebaikan kita semua
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            sx={{
              color: theme.palette.background.default
            }}
          >
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.background.default
              }}
            >
              Kontak:
            </Typography>
            <IconButton color="inherit">
              <PhoneRoundedIcon />
            </IconButton>
            <IconButton color="inherit">
              <MailRoundedIcon />
            </IconButton>
          </Stack>
        </Stack>
        {!mdDown && <Image src={hero} />}
      </Container>
    </Box>
  )
}

export default Hero
