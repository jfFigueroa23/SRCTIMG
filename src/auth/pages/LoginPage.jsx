import React, { useState } from 'react';
import { Box, Grid, Button, TextField, Typography, Link, IconButton, CircularProgress, Alert } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Google as GoogleIcon, Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useForms } from '../../hooks';
import { useDispatch } from 'react-redux';
import { onLogin, onchecking } from '../../store/AutenApi/ApiSlice';

const initialFormData = {
  email: '',
  password: '',
};

export const LoginPage = () => {
  const { email, password, onInputChange } = useForms(initialFormData);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsAuthenticating(true);
    dispatch(onchecking());

    try {
      const formData = new URLSearchParams();
      formData.append('grant_type', '');
      formData.append('username', email);
      formData.append('password', password);
      formData.append('scope', '');
      formData.append('client_id', '');
      formData.append('client_secret', '');

      const response = await axios.post('https://c4f5-177-230-73-82.ngrok-free.app/loginuser', formData, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });
      console.log(response);

      // Guardar el token en una cookie
      Cookies.set('access_token', response.data.access_token, { expires: 1 }); // 1 día de expiración

      dispatch(onLogin({ dataAcess: response.data.access_token, tokenType: response.data.token_type }));
      navigate('/inicio');

    } catch (error) {
      console.log({ error });
      if (error.response && error.response.status === 401) {
        setAuthError('Credenciales incorrectas. Por favor, inténtalo de nuevo.');
      } else {
        console.error('Error al iniciar sesión:', error.message);
        setAuthError('Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.');
      }
    } finally {
      setIsAuthenticating(false);
    }
  };

  return (
    <AuthLayout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxHeight: '90vh',
          maxWidth: '400px',
          mx: 'auto',
          my: 'auto',
          p: 2,
          animation: 'fadeInUp 0.5s ease-in-out',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Iniciar Sesión
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12}>
              <TextField
                label="Correo Electrónico"
                type="email"
                placeholder="correo@gmail.com"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
                InputProps={{
                  startAdornment: (
                    <IconButton disabled={isAuthenticating} tabIndex={-1}>
                      <EmailIcon />
                    </IconButton>
                  ),
                }}
                sx={{ transition: 'border-color 0.3s ease-in-out' }}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                placeholder="Contraseña"
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
                InputProps={{
                  startAdornment: (
                    <IconButton disabled={isAuthenticating} tabIndex={-1}>
                      <LockIcon />
                    </IconButton>
                  ),
                }}
                sx={{ transition: 'border-color 0.3s ease-in-out' }}
              />
            </Grid>

            <Grid item xs={12}>
              <Alert severity="error" style={{ display: authError ? 'block' : 'none', marginTop: '8px' }}>
                {authError}
              </Alert>
            </Grid>

            <Grid item xs={12}>
              <Button disabled={isAuthenticating} type="submit" variant="contained" fullWidth>
                {isAuthenticating ? <CircularProgress size={24} /> : "Iniciar Sesión"}
              </Button>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'right' }}>
              <Link component={RouterLink} color="inherit" to="/auth/register">
                ¿No tienes una cuenta? Regístrate aquí
              </Link>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'right' }}>
              <Link component={RouterLink} color="inherit" to="/auth/Contrasena">
                ¿Olvidaste tu contraseña?
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </AuthLayout>
  );
};
