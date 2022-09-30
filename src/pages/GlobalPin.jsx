import React, { useRef } from 'react'
import { setGlobalPin } from '../store'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'


const GlobalPin = () => {

    const inputPin = useRef(null)

    const handleGlobalPin = () => {
        setGlobalPin(1234)
    }
    
    return (
        <Container>
            <Typography variant='h3'>Inserire pin</Typography>
            <Stack direction='row' alignItems='center'>
                <TextField
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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