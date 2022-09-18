import { useState } from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import MenuIcon from '@mui/icons-material/Menu'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

const Navbar = () => {

    const menuItems = {}

    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <Box sx={{
            width: '100%',
            backgroundColor: 'primary.light',
            padding: '20px 0'
        }}>
            <Container sx={{
                display: 'flex',
                alignItems: 'center'
            }}>
                <Button onClick={() => setMenuOpen(!menuOpen)}>
                    <MenuIcon fontSize='large' />
                </Button>

                <Typography
                    variant='h1'
                    sx={{
                        fontSize: 30,
                        fontWeight: 200
                    }}
                >
                    Password Manager
                </Typography>
            </Container>
            <Drawer
                anchor='left'
                open={menuOpen}
                onClose={() => setMenuOpen(false)}
                sx={{
                    border: '1px solid red'
                }}
            >
                <Box
                    role='presentation'
                    onClick={() => setMenuOpen(false)}
                    sx={{
                        width: 300
                    }}
                >
                    <List>
                        <ListItem>Pagina 1</ListItem>
                        <ListItem>Pagina 2</ListItem>
                        <ListItem>Pagina 3</ListItem>
                    </List>
                </Box>

            </Drawer>
        </Box>
    )
}

export default Navbar