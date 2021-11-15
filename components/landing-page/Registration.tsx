import DateRangeRoundedIcon from '@mui/icons-material/DateRangeRounded'
import PersonRoundedIcon from '@mui/icons-material/PersonRounded'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import Slide from '@mui/material/Slide'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React from 'react'
import { useInView } from 'react-intersection-observer'
import { easing } from '@mui/material/styles'
const Registration = () => {
  const theme = useTheme()
  const { ref, inView, entry } = useInView({
    threshold: 1,
    rootMargin: '120px',
    triggerOnce: true
  })

  return (
    <Box
      component="div"
      id="vaccination"
      ref={ref}
      sx={{
        p: 2
      }}
    >
      <Slide direction="left" in={inView} timeout={1000} easing={{ enter: easing.easeInOut }}>
        <Container
          maxWidth="lg"
          component={Stack}
          spacing={2}
          disableGutters
          sx={{
            boxSizing: 'border-box',
            bgcolor: theme.palette.background.default,
            minHeight: 150,
            mt: '-75px',
            pl: { xs: 2, md: 3 },
            pr: { xs: 2, md: 3 },
            pt: 2,
            pb: 2,
            boxShadow: { xs: 4, md: 8 },
            borderRadius: 2
          }}
        >
          <Typography
            variant="h4"
            sx={{
              [theme.breakpoints.down('sm')]: {
                fontSize: 18
              }
            }}
          >
            Daftarkan Dirimu Dalam Program Vaksinasi COVID-19
          </Typography>
          <Divider />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr 1fr', sm: '1fr 1fr 1fr' },
              gap: { xs: 2, sm: 4, md: 8 },
              [theme.breakpoints.down('sm')]: {
                '& button': {
                  gridColumn: '1 / last-line'
                }
              }
            }}
          >
            <TextField
              InputProps={{ endAdornment: <PersonRoundedIcon color="primary" /> }}
              size="small"
              fullWidth
              label="Nama"
            />
            <TextField
              InputProps={{ endAdornment: <DateRangeRoundedIcon color="primary" /> }}
              size="small"
              fullWidth
              label="Tanggal"
            />
            <Button
              size="small"
              variant="contained"
              color="secondary"
              sx={{
                pl: 4,
                pr: 4
              }}
            >
              DAFTAR
            </Button>
          </Box>
        </Container>
      </Slide>
    </Box>
  )
}

export default Registration
