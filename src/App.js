import React from 'react'

import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'

import Navbar from './components/Navbar'


export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Navbar />
        </ThemeProvider>
    )
}