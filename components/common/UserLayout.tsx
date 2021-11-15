import RegisterRoundedIcon from '@mui/icons-material/AppRegistrationRounded'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeOutlined'
import MenuIcon from '@mui/icons-material/MenuRounded'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded'
import PersonOutlineRoundedIcon from '@mui/icons-material/PersonOutlineRounded'
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Link from 'next/link'
import React, { FC, MouseEvent, useState } from 'react'

const drawerWidth = 240

const MenuItems = () => {
  const theme = useTheme()

  return (
    <Stack
      sx={{
        '& *': {
          color: theme.palette.text.primary
        }
      }}
    >
      <Toolbar />
      <Divider />
      <List>
        <Link href="/u">
          <ListItem button>
            <ListItemIcon>
              <HomeRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Beranda" />
          </ListItem>
        </Link>
        <Link href="/u/vaccination-schedule">
          <ListItem button>
            <ListItemIcon>
              <RegisterRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Daftar" />
          </ListItem>
        </Link>
        <Link href="/u/vaccination-registration">
          <ListItem button>
            <ListItemIcon>
              <ScheduleRoundedIcon />
            </ListItemIcon>
            <ListItemText primary="Jadwal" />
          </ListItem>
        </Link>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemIcon>
            <HelpOutlineRoundedIcon />
          </ListItemIcon>
          <ListItemText primary="Bantuan" />
        </ListItem>
      </List>
    </Stack>
  )
}

interface DrawerOnXsScreenProps {
  open: boolean
  onClose: () => void
}

const DrawerOnXsScreen = ({ open, onClose }: DrawerOnXsScreenProps) => {
  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true
      }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
      }}
    >
      <MenuItems />
    </Drawer>
  )
}

const DrawerOnMdScreen = () => {
  return (
    <Drawer
      variant="permanent"
      sx={{
        display: { xs: 'none', md: 'block' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
      }}
      open
    >
      <MenuItems />
    </Drawer>
  )
}

const ProfileMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const theme = useTheme()

  const handleOpenMenu = (ev: MouseEvent<HTMLElement>) => {
    setAnchorEl(ev.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <Button color="inherit" onClick={handleOpenMenu} startIcon={<PersonOutlineRoundedIcon />}>
        Bagus
      </Button>
      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
        <Link href="/u/settings" prefetch>
          <MenuItem onClick={handleCloseMenu}>Pengaturan</MenuItem>
        </Link>
        <Divider />
        <MenuItem onClick={handleCloseMenu}>
          <ListItemIcon>
            <ExitToAppRoundedIcon
              fontSize="small"
              sx={{
                color: theme.palette.text.primary
              }}
            />
          </ListItemIcon>
          Sign out
        </MenuItem>
      </Menu>
    </Box>
  )
}

const NotifMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const theme = useTheme()

  const handleOpenMenu = (ev: MouseEvent<HTMLElement>) => {
    setAnchorEl(ev.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <IconButton color="inherit" onClick={handleOpenMenu}>
        <Badge badgeContent={10} variant="standard" color="primary">
          <NotificationsNoneRoundedIcon />
        </Badge>
      </IconButton>
      <Menu
        open={!!anchorEl}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        PaperProps={{
          sx: {
            width: 300
          }
        }}
      >
        <MenuItem onClick={handleCloseMenu}>Pendaftaran vaksin anda disetujui</MenuItem>
        <MenuItem onClick={handleCloseMenu}>Pendaftaran vaksin anda disetujui</MenuItem>
      </Menu>
    </Box>
  )
}

const UserLayout: FC = ({ children }) => {
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        elevation={1}
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: theme.palette.background.default,
          opacity: 1,
          color: theme.palette.text.primary
        }}
      >
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { md: 'none' },
              color: 'inherit'
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box flexGrow={1} />
          <Stack direction="row" spacing={1} alignItems="center">
            <NotifMenu />
            <ProfileMenu />
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { md: drawerWidth },
          flexShrink: { md: 0 }
        }}
        aria-label="mailbox folders"
      >
        <DrawerOnXsScreen open={mobileOpen} onClose={handleDrawerToggle} />
        <DrawerOnMdScreen />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          width: { md: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

export default UserLayout
