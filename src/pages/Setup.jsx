import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import crypto from 'crypto-js'

import { MasterPassword } from '../store'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import Checkbox from '@mui/material/Checkbox'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Snackbar from '@mui/material/Snackbar'
import TextField from '@mui/material/TextField'

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CloseIcon from '@mui/icons-material/Close'


const SetGlobalPin = () => {

    const inputPasswordRef = useRef(null)
    const inputConfirmPasswordRef = useRef(null)

    const [activeStep, setActiveStep] = useState(0)
    const [checkboxValue, setCheckboxValue] = useState(false)
    const [errorShow, setErrorShow] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const handleSetMasterPassword = () => {
        const currentPassword = inputPasswordRef.current.value
        const currentConfirmPassword = inputConfirmPasswordRef.current.value
        const regex = new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')
        const isValidPassword = regex.test(currentPassword)
        if (!isValidPassword) {
            setErrorMessage('La password deve contenere almeno 8 caratteri, di cui almeno una lettera minuscola, una maiuscola, un numero e un carattere speciale')
            setErrorShow(true)
            return
        }
        if (currentConfirmPassword !== currentPassword) {
            setErrorMessage('Le due password non corrispondono')
            setErrorShow(true)
            return
        }
        const hashedPassword = crypto.SHA256(currentPassword).toString(crypto.enc.Hex)
        MasterPassword.set(hashedPassword)
        setActiveStep(1)
    }

    const handleSubmit = () => {
        const initPwData = {
            Personali: {}
        }
        localStorage.setItem('pwdata', JSON.stringify(initPwData))

        //Setup global checksum
        const masterPassword = MasterPassword.get()
        localStorage.setItem('checksum', masterPassword.substring(0, 4))

        navigate('/')
    }

    const closeError = () => {
        setErrorShow(false)
    }

    const steps = [
        'Imposta Master Password',
        'Conferma'
    ]

    return (
        <div>
            <Container>
                <Typography variant='h2'>Setup</Typography>
                <Box sx={{ width: '100%' }}>
                    <Stepper activeStep={activeStep} alternativeLabel >
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>


                {activeStep === 0 && <Box
                    sx={{
                        maxWidth: '350px',
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column'
                    }}
                >
                    <Stack
                        direction='row'
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '20px'
                        }}
                    >
                        <TextField
                            label="Master password"
                            type="password"
                            variant="outlined"
                            inputRef={inputPasswordRef}
                        />
                    </Stack>
                    <Stack
                        direction='row'
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '20px'
                        }}
                    >
                        <TextField
                            label="Conferma password"
                            type="password"
                            variant="outlined"
                            inputRef={inputConfirmPasswordRef}
                        />
                        <IconButton onClick={handleSetMasterPassword}>
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Stack>
                </Box>}

                {activeStep === 1 && <Box sx={{
                    marginTop: '20px'
                }}>
                    <Typography variant='p'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem laborum nemo aut quia neque laudantium non debitis. Explicabo, corrupti! Aliquam adipisci doloremque possimus quasi ab atque labore dignissimos harum vero quos, rerum repellat quod omnis assumenda commodi, consequuntur at. Fugiat nostrum porro, sapiente, earum nam aliquid possimus natus ullam quidem blanditiis facere repudiandae voluptatum ad quos. Tenetur amet iusto fugit ratione quos optio suscipit pariatur doloribus at. Est, recusandae! Vero, cumque ipsa? Et sequi magnam, necessitatibus est, voluptas laborum iste obcaecati quasi exercitationem repudiandae consequuntur cum id in assumenda fugiat! Consequuntur eum ex consectetur voluptatibus asperiores officia minus omnis. Sunt.</Typography>
                    <FormGroup>
                        <FormControlLabel control={
                            <Checkbox
                                checked={checkboxValue}
                                onChange={() => setCheckboxValue(!checkboxValue)}
                            />
                        } label="Ho preso nota" />
                    </FormGroup>
                    <Box
                        textAlign='center'
                        sx={{ marginTop: '20px' }}
                    >
                        <Button
                            variant='contained'
                            size='large'
                            disabled={!checkboxValue}
                            onClick={handleSubmit}
                        >Continua</Button>
                    </Box>
                </Box>}

            </Container>

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
        </div>
    )
}

export default SetGlobalPin