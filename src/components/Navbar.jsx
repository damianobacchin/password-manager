import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import IconButton from '@mui/material/IconButton'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Stack from '@mui/material/Stack'
import HomeIcon from '@mui/icons-material/Home'
import SettingsIcon from '@mui/icons-material/Settings'

const Navbar = () => {

    const menuItems = {}
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <>
            <Box
                sx={{
                    backgroundColor: 'primary.light',
                    padding: '12px 0'
                }}
            >
                <Container>
                    <Stack direction='row' alignItems='center'>
                        <IconButton onClick={() => setMenuOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant='h4' element='h1'>Password Manager</Typography>

                    </Stack>
                </Container>
            </Box>

            <Drawer
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
            >
                <List
                    sx={{
                        backgroundColor: 'primary.light',
                        //paddingTop: '30px',
                        height: '100vh',
                        minWidth: '200px'
                    }}
                >
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => setMenuOpen(false)}>
                            <ListItemIcon>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText>
                                <Link  to='/'>Home</Link>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>
                    
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => setMenuOpen(false)}>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText>
                                <Link  to='/settings'>Settings</Link>
                            </ListItemText>
                        </ListItemButton>
                    </ListItem>

                </List>

                <Outlet />
            </Drawer>



        </>
    )
}

export default Navbar