import { LogoutOutlined, MenuOutlined } from '@mui/icons-material'
import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material'
import { Link as RouerLink } from 'react-router-dom'

export const NavBar = () => {
  return (
    <AppBar
     position='fixed'
     
    >
        <Toolbar>
            <IconButton
                color='inherit'
                edge="start"
                sx={{ mr: 2, display: { sm: 'none' }}}
            >
                <MenuOutlined />
            </IconButton>

            <Grid container direction="row" justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' noWrap component='div'> Inicio</Typography>

                <IconButton LinkComponent={ RouerLink } to='/auth/login' color='error'>
                    <LogoutOutlined />
                </IconButton>
                

            </Grid>
        </Toolbar>


    </AppBar>
  )
}
