import { Box, Grid, Button, TextField, Typography, Link, IconButton, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Google as GoogleIcon, Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { Alert } from '@mui/material';
import { useForms } from '../../hooks';

const initialFormData = {
  email: '',
  password: '',
};

export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForms(initialFormData);
  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    dispatch(startGoogleSignIn());
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
          animation: 'fadeInUp 0.5s ease-in-out', // Animación de entrada
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
                    <IconButton disabled={isAuthenticating}>
                      <EmailIcon />
                    </IconButton>
                  ),
                }}
                sx={{ transition: 'border-color 0.3s ease-in-out' }} // Efecto visual en el campo de entrada
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
                    <IconButton disabled={isAuthenticating}>
                      <LockIcon />
                    </IconButton>
                  ),
                }}
                sx={{ transition: 'border-color 0.3s ease-in-out' }} // Efecto visual en el campo de entrada
              />
            </Grid>

            <Grid item xs={12}>
              <Alert severity="error" style={{ display: errorMessage ? 'block' : 'none', marginTop: '8px' }}>
                {errorMessage}
              </Alert>
            </Grid>

            <Grid item xs={12}>
              <Button disabled={isAuthenticating} type="submit" variant="contained" fullWidth>
                {isAuthenticating ? <CircularProgress size={24} /> : "Iniciar Sesión"}
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                disabled={isAuthenticating}
                variant="contained"
                fullWidth
                onClick={onGoogleSignIn}
                startIcon={<GoogleIcon />}
                sx={{ transition: 'background-color 0.3s ease-in-out' }} // Efecto visual en el botón
              >
                Iniciar Sesión con Google
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
