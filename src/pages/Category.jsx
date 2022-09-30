import React from 'react'
import { useParams } from 'react-router-dom'
import categories from '../data/categories.json'

import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Button from '@mui/material/Button'

import KeyIcon from '@mui/icons-material/Key'

const Category = () => {

    let { id } = useParams()
    const categoryName = categories[id].text

    const pwdata = localStorage.getItem('pwdata')
    console.log(JSON.parse(pwdata))


    return (
        <div>
            <Container>
                <Typography variant='h3'>{categoryName}</Typography>
                <List>
                    <ListItem>
                        <ListItemButton>
                            <ListItemIcon>
                                <KeyIcon />
                            </ListItemIcon>
                            <ListItemText>Password 1</ListItemText>
                        </ListItemButton>
                    </ListItem>
                </List>
            </Container>
        </div>
    )
}

export default Category