import { useEffect, useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { MasterPassword } from '../store'

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
import AddCircleIcon from '@mui/icons-material/AddCircle'
import KeyIcon from '@mui/icons-material/Key'




const Navbar = () => {
    const navigate = useNavigate()
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const masterPassword = MasterPassword.get()
        const setup = localStorage.getItem('checksum')
        if (setup && !masterPassword && location.pathname !== '/master-password') navigate('/master-password')
        if (!setup && location.pathname !== '/setup') navigate('/setup')
    })


    return (
        <>
            <Box
                sx={{
                    backgroundColor: 'primary.light',
                    padding: '20px 0'
                }}
            >
                <Container>
                    <Stack direction='row' alignItems='center'>
                        <IconButton onClick={() => setMenuOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            variant='h4'
                            element='h1'
                            sx={{
                                marginLeft: '20px',
                                fontWeight: '300'
                            }}
                        >
                            Password Manager
                        </Typography>

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
                        height: '100vh'
                    }}
                >
                    <Link to='/'>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setMenuOpen(false)}>
                                <ListItemIcon>
                                    <HomeIcon />
                                </ListItemIcon>
                                <ListItemText> Home </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </Link>

                    <Link to='/new-password'>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setMenuOpen(false)}>
                                <ListItemIcon>
                                    <AddCircleIcon />
                                </ListItemIcon>
                                <ListItemText> Add Password </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </Link>

                    <Link to='/gen-password'>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setMenuOpen(false)}>
                                <ListItemIcon>
                                    <KeyIcon />
                                </ListItemIcon>
                                <ListItemText> Generate Password </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </Link>

                    <Link to='/settings'>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => setMenuOpen(false)}>
                                <ListItemIcon>
                                    <SettingsIcon />
                                </ListItemIcon>
                                <ListItemText> Settings </ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </Link>

                </List>

                <Outlet />
            </Drawer>



        </>
    )
}

export default Navbar