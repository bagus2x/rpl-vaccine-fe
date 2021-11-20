import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import MailIcon from '@mui/icons-material/Mail'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import { useMediaQuery } from '@mui/material'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles'
import { FC, useState } from 'react'
import Link from 'next/link'
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined'

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  p: 0,
  width: '58px'
})

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}))

const AdminLayout: FC = ({ children }) => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const smDown = useMediaQuery(theme.breakpoints.down('sm'))

  const handleToggleOpen = () => {
    setOpen(!open)
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton
            onClick={handleToggleOpen}
            sx={{
              transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.standard
              }),
              transform: `rotate(${open ? 0 : 180}deg)`
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          sx={{
            '& *': {
              color: theme.palette.text.primary
            }
          }}
        >
          <Link href="/a">
            <ListItem button>
              <ListItemIcon>
                <HomeOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Beranda" />
            </ListItem>
          </Link>
          <Link href="/a/article">
            <ListItem button>
              <ListItemIcon>
                <ArticleOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Article" />
            </ListItem>
          </Link>
          <Link href="/a/vaccination">
            <ListItem button>
              <ListItemIcon>
                <CheckBoxOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Vaksinasi" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          transition: theme.transitions.create('filter', {
            duration: theme.transitions.duration.complex
          }),
          filter: `blur(${open && smDown ? '5px' : '0px'})`
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default AdminLayout
