import useHasRole from '@/hooks/query/has-role'
import useNotifications from '@/hooks/query/notifications'
import useUser from '@/hooks/query/user'
import { truncate } from '@/utils/truncate'
import RegisterRoundedIcon from '@mui/icons-material/AppRegistrationRounded'
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded'
import HelpOutlineRoundedIcon from '@mui/icons-material/HelpOutlineRounded'
import HomeRoundedIcon from '@mui/icons-material/HomeOutlined'
import MenuIcon from '@mui/icons-material/MenuRounded'
import NotificationsNoneRoundedIcon from '@mui/icons-material/NotificationsNoneRounded'
import ScheduleRoundedIcon from '@mui/icons-material/ScheduleRounded'
import AppBar from '@mui/material/AppBar'
import Badge from '@mui/material/Badge'
import Box from '@mui/material/Box'
import ButtonBase from '@mui/material/ButtonBase'
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
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, MouseEvent, useMemo, useState } from 'react'
import ButtonLink from '../ui/ButtonLink'

const drawerWidth = 240

const MenuItems = () => {
  const theme = useTheme()
  const user = useUser()
  const hasRole = useHasRole(user.data?.roles)

  return (
    <>
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
          <Link href="/u/registration">
            <ListItem button>
              <ListItemIcon>
                <RegisterRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Pendaftaran" />
            </ListItem>
          </Link>
          <Link href="/u/history">
            <ListItem button>
              <ListItemIcon>
                <ScheduleRoundedIcon />
              </ListItemIcon>
              <ListItemText primary="Riwayat" />
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
      <Box flexGrow={1} />
      {hasRole('ROLE_ADMIN') && (
        <Link href="/a">
          <List>
            <ListItem button>
              <ListItemText primaryTypographyProps={{ variant: 'body2' }} primary="Beralih sebagai admin" />
            </ListItem>
          </List>
        </Link>
      )}
    </>
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
        '& .MuiDrawer-paper': {
          boxSizing: 'border-box',
          width: drawerWidth,
          display: 'flex',
          height: '100vh',
          flexDirection: 'column'
        }
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
  const user = useUser()

  const handleOpenMenu = (ev: MouseEvent<HTMLElement>) => {
    setAnchorEl(ev.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <ButtonBase
        onClick={handleOpenMenu}
        disabled={!user.isSuccess}
        sx={{
          display: 'flex',
          alignItems: 'center',
          borderRadius: 8,
          p: 0.5,
          color: theme.palette.text.primary,
          fontSize: theme.typography.fontSize
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            background: '#eee',
            borderRadius: '50%',
            mr: 1,
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <Image
            src={
              user.isSuccess
                ? user.data.photo || user.data.gender === 'MALE'
                  ? '/assets/male.svg'
                  : '/assets/female.svg'
                : '/assets/male.svg'
            }
            layout="fill"
            objectFit="cover"
          />
        </Box>
        {user.isSuccess ? truncate(user.data.name, 5) : 'Halo, pengguna'}
      </ButtonBase>
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
        <Link passHref href="/signout">
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
        </Link>
      </Menu>
    </Box>
  )
}

const NotifMenu = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const theme = useTheme()
  const notifications = useNotifications()
  const unseenTotal = useMemo(
    () => notifications.data?.reduce((t, n) => (n.status === 'UNSEEN' ? t + 1 : t), 0),
    notifications.data
  )

  const handleOpenMenu = (ev: MouseEvent<HTMLElement>) => {
    setAnchorEl(ev.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <Box>
      <IconButton color="inherit" onClick={handleOpenMenu}>
        <Badge badgeContent={unseenTotal} variant="standard" color="primary">
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
        {notifications.data?.map((notif) => (
          <MenuItem key={notif.id} onClick={handleCloseMenu}>
            {notif.title}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  )
}

const UserLayout: FC = ({ children }) => {
  const theme = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const user = useUser()

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
            {user.isSuccess ? (
              <>
                <ProfileMenu />
                <NotifMenu />
              </>
            ) : (
              <ButtonLink href="/signin" variant="contained" disableElevation size="small">
                Masuk
              </ButtonLink>
            )}
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
