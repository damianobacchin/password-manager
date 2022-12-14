import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'

import AddCircleIcon from '@mui/icons-material/AddCircle'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'

const Home = () => {

    const categories = JSON.parse(localStorage.getItem('pwdata'))
    const categoryNameRef = useRef(null)
    const [showModal, setShowModal] = useState(false)

    const handleAddCategory = () => {
        const categoryName = categoryNameRef.current.value
        const newCategories = {
            ...categories,
            [categoryName]: {}
        }
        localStorage.setItem('pwdata', JSON.stringify(newCategories))
        setShowModal(false)
    }

    return (
        <div>
            <Container>
                <Typography variant='h2'> Categorie </Typography>

                <List>
                    {categories && Object.keys(categories).map(category => {
                        return <Link key={category} to={`category/${category}`}>
                            <ListItem disablePadding>
                                <ListItemButton
                                    sx={{
                                        borderRadius: '10px'
                                    }}
                                >
                                    <ListItemIcon>
                                        <ArrowForwardIosIcon fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText> {category} </ListItemText>
                                </ListItemButton>
                            </ListItem>
                        </Link>
                    })}
                </List>

            </Container>

            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '20%',
                        left: '50%',
                        transform: 'translate(-50%, -20%)',
                        width: 400,
                        bgcolor: 'primary.light',
                        boxShadow: 24,
                        p: 4
                    }}>
                    <Typography variant='h5'>Modal</Typography>
                    <input type="text"
                        placeholder='Nome categoria'
                        ref={categoryNameRef}
                    />
                    <Button onClick={() => handleAddCategory()}>Aggiungi</Button>
                </Box>

            </Modal>

            <Fab
                variant="extended"
                color="primary"
                aria-label="add"
                onClick={() => setShowModal(true)}
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                }}
            >
                <AddCircleIcon sx={{ mr: 1 }} />
                Aggiungi
            </Fab>
        </div>
    )
}

export default Home