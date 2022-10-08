import React, { useState, useRef } from 'react'
import { pin, password } from '../store'
import { useNavigate } from 'react-router-dom'
import crypto from 'crypto-js'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CloseIcon from '@mui/icons-material/Close'


const GlobalPassword = () => {

    const navigate = useNavigate()
    const [errorShow, setErrorShow] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const inputPw = useRef(null)

    const handleGlobalPw = () => {
        const pwValue = inputPw.current.value
        if (pwValue) password.set(pwValue)
        const pinValue = pin.get()
        const hashedPin = crypto.SHA256(pinValue).toString(crypto.enc.Hex)
        const hashedPassword = crypto.SHA256(pwValue).toString(crypto.enc.Hex)
        const checksumValue = crypto.SHA256(hashedPin + hashedPassword).toString(crypto.enc.Hex).substring(0, 4)
        
        if (checksumValue !== localStorage.getItem('checksum')) {
            setErrorMessage('Pin o master password non corretti')
            setErrorShow(true)
            setTimeout(() => {
                navigate('/global-pin')
            }, 2000)
            
        } else {
            navigate('/')
        }
    }

    const closeError = () => {
        setErrorShow(false)
    }
    
    return (
        <Container>
            <Typography variant='h3'>Inserire Master password</Typography>
            <Stack direction='row' alignItems='center'>
                <input
                style={{
                    height: 30
                }}
                    type='password'
                    ref={inputPw}
                />
                <IconButton onClick={handleGlobalPw} >
                    <ArrowForwardIosIcon />
                </IconButton>
            </Stack>

            <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={errorShow}
                onClose={closeError}
                message={errorMessage}
                action={
                    <React.Fragment>
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            sx={{ p: 0.5 }}
                            onClick={closeError}
                        >
                            <CloseIcon />
                        </IconButton>
                    </React.Fragment>
                }
            />
            
        </Container>
    )
}

export default GlobalPassword