import React, { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import crypto from 'crypto-js'

import { pin, password } from '../store'

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

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CloseIcon from '@mui/icons-material/Close'


const SetGlobalPin = () => {

    const inputPinRef = useRef(null)
    const inputPasswordRef = useRef(null)
    const inputConfirmPasswordRef = useRef(null)

    const [activeStep, setActiveStep] = useState(0)
    const [checkboxValue, setCheckboxValue] = useState(false)
    const [errorShow, setErrorShow] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const navigate = useNavigate()

    const handleSetGlobalPin = () => {
        const currentPin = inputPinRef.current.value
        if (currentPin.length < 4) {
            setErrorMessage('Inserire un PIN di almeno 4 cifre')
            setErrorShow(true)
            return
        }
        const hashedPin = crypto.SHA256(currentPin).toString(crypto.enc.Hex)
        pin.set(hashedPin)
        setActiveStep(1)
    }

    const handleSetGlobalPassword = () => {
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
        password.set(hashedPassword)
        setActiveStep(2)
    }

    const handleSubmit = () => {

        const initPwData = {
            Personali: {}
        }
        localStorage.setItem('init', true)
        localStorage.setItem('pwdata', JSON.stringify(initPwData))
        navigate('/')
    }

    const closeError = () => {
        setErrorShow(false)
    }

    const steps = [
        'Imposta PIN',
        'Imposta Password',
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

                {activeStep === 0 && <Stack
                    direction='row'
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: '20px'
                    }}
                >
                    <input
                        type='number'
                        ref={inputPinRef}
                        style={{
                            borderRadius: '10px',
                            border: '1px solid grey',
                            padding: '0 15px',
                            maxWidth: '100px',
                            fontSize: '20px',
                            fontWeight: '100',
                            color: 'grey'
                        }}
                    />
                    <IconButton onClick={handleSetGlobalPin}>
                        <ArrowForwardIosIcon />
                    </IconButton>
                </Stack>}

                {activeStep === 1 && <Box
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
                        <input
                            type='password'
                            ref={inputPasswordRef}
                            placeholder='Digitare password'
                            style={{
                                borderRadius: '10px',
                                border: '1px solid grey',
                                padding: '0 15px',
                                height: '37px',
                                width: '100%',
                                fontSize: '20px',
                                fontWeight: '100',
                                color: 'grey'
                            }}
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
                        <input
                            type='password'
                            ref={inputConfirmPasswordRef}
                            placeholder='Conferma password'
                            style={{
                                borderRadius: '10px',
                                border: '1px solid grey',
                                padding: '0 15px',
                                width: '100%',
                                fontSize: '20px',
                                fontWeight: '100',
                                color: 'grey'
                            }}
                        />
                        <IconButton onClick={handleSetGlobalPassword}>
                            <ArrowForwardIosIcon />
                        </IconButton>
                    </Stack>
                </Box>}

                {activeStep === 2 && <Box sx={{
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