import React, { useRef } from 'react'
import { pin } from '../store'
import { useNavigate } from 'react-router-dom'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'


const GlobalPin = () => {
    const navigate = useNavigate()

    const inputPin = useRef(null)

    const handleGlobalPin = () => {
        pin.set(inputPin.current.value)
        navigate('/global-password')
    }
    
    return (
        <Container>
            <Typography variant='h3'>Inserire pin</Typography>
            <Stack direction='row' alignItems='center'>
                <input
                style={{
                    height: 30
                }}
                    type='number'
                    ref={inputPin}
                />
                <IconButton onClick={handleGlobalPin} >
                    <ArrowForwardIosIcon />
                </IconButton>
            </Stack>
            
        </Container>
    )
}

export default GlobalPin