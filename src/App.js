import React from 'react'
import {
    BrowserRouter as Router,
    Routes,
    Route
} from 'react-router-dom'

import { ThemeProvider } from '@mui/material/styles'
import { theme } from './theme'

import Navbar from './components/Navbar'
import Home from './pages/Home'
import Settings from './pages/Settings'
import NewPassword from './pages/NewPassword'
import GenPassword from './pages/GenPassword'
import Category from './pages/Category'
import GlobalPin from './pages/GlobalPin'
import GlobalPassword from './pages/GlobalPassword'
import SetGlobalPin from './pages/SetGlobalPin'


export default function App() {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Navbar />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path='/settings' element={<Settings />} />
                    <Route path='/new-password' element={<NewPassword />} />
                    <Route path='/gen-password' element={<GenPassword />} />
                    <Route path='/categories/:id' element={<Category />} />
                    <Route path='/global-pin' element={<GlobalPin />} />
                    <Route path='/global-password' element={<GlobalPassword />} />
                    <Route path='/set-global-pin' element={<SetGlobalPin />} />
                </Routes>
            </Router>
        </ThemeProvider>
    )
}