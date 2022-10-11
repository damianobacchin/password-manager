import React, { useState, useRef } from 'react'
import { MasterPassword } from '../store'
import { useNavigate } from 'react-router-dom'
import crypto from 'crypto-js'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import TextField from '@mui/material/TextField'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CloseIcon from '@mui/icons-material/Close'


const GlobalPassword = () => {

    const navigate = useNavigate()
    const [errorShow, setErrorShow] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const inputPw = useRef(null)

    const handleSetMasterPassword = () => {
        const passwordValue = inputPw.current.value
        const hashedPassword = crypto.SHA256(passwordValue).toString(crypto.enc.Hex)
        const checksumValue = hashedPassword.substring(0, 4)

        console.log(checksumValue, localStorage.getItem('checksum'))

        if (checksumValue !== localStorage.getItem('checksum')) {
            setErrorMessage('Master password non corretta')
            setErrorShow(true)
            setTimeout(() => {
                navigate('/master-password')
            }, 2000)
            
        } else {
            MasterPassword.set(hashedPassword)
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
                <TextField
                    label="Master password"
                    type="password"
                    variant="outlined"
                    inputRef={inputPw}
                />
                <IconButton onClick={handleSetMasterPassword} >
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