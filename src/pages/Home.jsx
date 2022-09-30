import React from 'react'
import { Link } from 'react-router-dom'
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

import AddCircleIcon from '@mui/icons-material/AddCircle'

const Home = () => {
  return (
    <div>
      <Container>
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='baseline'
        >
          <Typography variant='h2'> Categorie </Typography>
          <Button
            variant='contained'
            startIcon={<AddCircleIcon />}
          >
            Nuova categoria
          </Button>
        </Stack>

        <List>
          {Object.keys(categories).map(category => {
            return <Link key={category} to={categories[category].link}>
              <ListItem disablePadding>
                <ListItemButton
                  sx={{
                    borderRadius: '10px'
                  }}
                  >
                  <ListItemIcon>
                    <AddCircleIcon />
                  </ListItemIcon>
                  <ListItemText> {categories[category].text} </ListItemText>
                </ListItemButton>
              </ListItem>
            </Link>
          })}



        </List>

      </Container>
    </div>
  )
}

export default Home