import { AppBar, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../store/auth';
import { Link as RouterLink } from 'react-router-dom'; 
import { Home, LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { onLogout } from '../../store/AutenApi/ApiSlice';

export const NavBar = () => {
    const dispatch = useDispatch();

    const salir = () => {
        dispatch(onLogout());
    }
    

    return (
        <AppBar position='fixed'>
            <Toolbar>
                <IconButton color='inherit' edge="start" sx={{ mr: 2, display: { sm: 'none' }}}>
                    <MenuOutlined />
                </IconButton>

                <Grid container direction="row" justifyContent='space-between' alignItems='center'>

                    <IconButton component={RouterLink} to="/inicio" color='#000000' noWrap variant='h6'> 
                        <Home/> 
                    </IconButton>   

                    <Button component={RouterLink} to="/testuser" color='secondary' noWrap variant='h6'> 
                        Usuario
                    </Button>

                    <Button component={RouterLink} to="/ayuda" color='secondary' noWrap variant='h6'> 
                        Acerca De
                    </Button>

                    <IconButton onClick={salir} color='error'>
                        <LogoutOutlined />
                    </IconButton>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
