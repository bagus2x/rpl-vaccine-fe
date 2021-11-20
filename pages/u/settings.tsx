import UserLayout from '@/components/common/UserLayout'
import { NextPageWithLayout } from '@/utils/types'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import React, { ReactElement } from 'react'
import Container from '@mui/material/Container'
import { Divider, IconButton, List, ListItem, ListItemButton, ListItemText, Switch, Typography } from '@mui/material'
import { useChangeThemeMode } from '@/components/common/ThemeProvider'
import TranslateRoundedIcon from '@mui/icons-material/TranslateRounded'
import Auth from '@/components/common/Auth'
import useUser from '@/hooks/query/user'

const Settings: NextPageWithLayout = () => {
  const { mode, changeThemeMode } = useChangeThemeMode()
  const user = useUser()

  const handleChange = () => {
    const newMode = mode === 'light' ? 'dark' : 'light'
    localStorage.setItem('theme_mode', newMode)
    changeThemeMode(newMode)
  }

  return (
    <Container component={Stack} maxWidth="md" spacing={8} disableGutters>
      <List>
        <Typography variant="h5">Akun</Typography>
      </List>
      <div>{JSON.stringify(user.data)}</div>
      <List disablePadding>
        <Typography variant="h5" mb={2}>
          Preferensi
        </Typography>
        <ListItem disableGutters secondaryAction={<Switch checked={mode === 'dark'} onChange={handleChange} />}>
          <ListItemText>Dark Mode</ListItemText>
        </ListItem>
        <Divider />
        <ListItem
          disableGutters
          secondaryAction={
            <IconButton>
              <TranslateRoundedIcon />
            </IconButton>
          }
        >
          <ListItemText>Bahasa</ListItemText>
        </ListItem>
      </List>
    </Container>
  )
}

Settings.getLayout = function getLayout(page: ReactElement) {
  return <UserLayout>{page}</UserLayout>
}

Settings.auth = function auth(page: ReactElement) {
  return <Auth role="ROLE_USER">{page}</Auth>
}

export default Settings
