import { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'
//import categories from '../data/categories.json'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'
import Fab from '@mui/material/Fab'
import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'

import KeyIcon from '@mui/icons-material/Key'
import AddCircleIcon from '@mui/icons-material/AddCircle'

const Category = () => {

    let { id } = useParams()
    const [showModal, setShowModal] = useState(false)
    const pwRef = useRef(null)

    const pwdata = JSON.parse(localStorage.getItem('pwdata'))
    const pwsCategory = pwdata[id]

    const handleAddPassword = () => {
        const pwName = pwRef.current.value
        let newPwData = pwdata
        newPwData[id] = {
            ...pwdata[id],
            [pwName]: "password"
        }
        localStorage.setItem('pwdata', JSON.stringify(newPwData))
        setShowModal(false)
    }

    return (
        <div>
            <Container>
                <Typography variant='h3'>{id}</Typography>
                <List>
                    {pwsCategory && Object.keys(pwsCategory).map(pw => (
                        <ListItem>
                            <ListItemButton>
                                <ListItemIcon>
                                    <KeyIcon />
                                </ListItemIcon>
                                <ListItemText>{pw}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                {Object.keys(pwsCategory).length === 0 && <Typography variant='h4'>Nessuna password ancora</Typography>}

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
                            placeholder='Titolo password'
                            ref={pwRef}
                        />
                        <Button onClick={handleAddPassword}>Aggiungi</Button>
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
            </Container>
        </div>
    )
}

export default Category