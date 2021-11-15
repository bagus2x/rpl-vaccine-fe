import CoronavirusRoundedIcon from '@mui/icons-material/CoronavirusRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import PeopleRoundedIcon from '@mui/icons-material/PeopleRounded'
import SecurityRoundedIcon from '@mui/icons-material/VerifiedUserRounded'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { alpha, useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'

const vaccineBenefits = [
  {
    title: 'Efektif meminimalisir penyebaran virus',
    desc: 'Vaksin COVID-19 telah terbukti efektif untuk mencegah seseorang terinfeksi virus corona',
    Icon: CoronavirusRoundedIcon
  },
  {
    title: 'Membentuk antibodi',
    desc: 'Vaksin COVID-19 terbukti bisa membantu membentuk response antibodi untuk kekebalan tubuh',
    Icon: SecurityRoundedIcon
  },
  {
    title: 'Melindungi orang-orang disekitar',
    desc: 'Vaksinasi COVID-19 yang didapatkan juga bisa memantu melindungi orang disekitar kita',
    Icon: PeopleRoundedIcon
  },
  {
    title: 'Menciptakan kekebalan kelompok',
    desc: 'Vaksinasi COVID-19 juga dapat bermanfaat untuk mecniptakan kekebalan kelompok atau herd immunity',
    Icon: GroupsRoundedIcon
  }
]

const VaccineBenefits = () => {
  const theme = useTheme()

  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: { xs: 4, md: 12 }
      }}
    >
      <Box>
        <Typography variant="h4">Kenapa Harus Vaksin?</Typography>
        <Typography variant="body1" mt={2}>
          Agar tidak lagi ada keraguan untuk mendapatkan vaksin COVID-19, kenali 4 dari beberapa manfaat vaksinasi
          berikut:
        </Typography>
        <Grid container spacing={4} mt={2}>
          {vaccineBenefits.map((vb, i) => (
            <Grid
              key={i}
              item
              xs={12}
              md={6}
              sx={{
                display: 'grid',
                gridTemplateColumns: 'auto 1fr',
                gridTemplateAreas: ` "icon title" "icon descr"`,
                gap: 2
              }}
            >
              <vb.Icon
                fontSize="large"
                color="primary"
                sx={{
                  gridArea: 'icon',
                  bgcolor: theme.palette.background.default,
                  boxShadow: `0px 4px 12px ${alpha(theme.palette.primary.main, 0.3)}`,
                  p: 1,
                  width: 50,
                  height: 50,
                  borderRadius: '50%'
                }}
              />
              <Typography variant="h5" gridArea="title">
                {vb.title}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: 'text.secondary'
                }}
              >
                {vb.desc}
              </Typography>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  )
}

export default VaccineBenefits
