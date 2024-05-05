import { AppBar, Button, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../store/auth';
import { Link as RouterLink } from 'react-router-dom'; 
import { Home, LogoutOutlined, MenuOutlined } from '@mui/icons-material';

export const NavBar = () => {
    const dispatch = useDispatch();

    const onLogout = () => {
        dispatch(startLogout());
    }

    return (
        <AppBar position='fixed'>
            <Toolbar>
                <IconButton color='inherit' edge="start" sx={{ mr: 2, display: { sm: 'none' }}}>
                    <MenuOutlined />
                </IconButton>

                <Grid container direction="row" justifyContent='space-between' alignItems='center'>

                    <IconButton component={RouterLink} to="/inicio" color='icons' noWrap variant='h6'> 
                        <Home/> 
                    </IconButton>   

                    <Button component={RouterLink} to="/testuser" color='secondary' noWrap variant='h6'> 
                        Usuario
                    </Button>

                    <IconButton onClick={onLogout} color='error'>
                        <LogoutOutlined />
                    </IconButton>
                </Grid>
            </Toolbar>
        </AppBar>
    )
}
