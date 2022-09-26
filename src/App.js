import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link
} from 'react-router-dom'

import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Settings from './pages/Settings'


export default function App() {
    return (
        <ThemeProvider theme={theme}>

            <Router>
                <Navbar />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path='/settings' element={<Settings />} />
                </Routes>
            </Router>
        </ThemeProvider>
    )
}