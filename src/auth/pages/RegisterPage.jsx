import { useState } from 'react';
import { Box, Grid, Button, TextField, Typography, Link, IconButton, MenuItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Google as GoogleIcon } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { startGoogleSignIn, startCreatingUserWithEmailPassword } from '../../store/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@mui/material';

const initialFormData = {
  email: '',
  password: '',
  confirmPassword: '',
  displayName: '',
  gender: '',
};

export const RegisterPage = () => {
  const { errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [passwordError, setPasswordError] = useState('');

  const { 
    email, 
    password, 
    confirmPassword, 
    displayName, 
    gender, 
    onInputChange 
  } = useForm(initialFormData);

  const onSubmit = async (event) => {
    event.preventDefault();
    
    // Validar si las contraseñas coinciden
    if (password !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    }

    // Resetear el mensaje de error
    setPasswordError('');

    // Dispatch de la acción de registro
    dispatch(startCreatingUserWithEmailPassword({ 
      email, 
      password, 
      displayName, 
      gender, 
    }));
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
          minHeight: '90vh',
          maxWidth: '400px',
          mx: 'auto',
          my: 'auto',
          p: 2,
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Registro
        </Typography>
        <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                type="text"
                fullWidth
                name="displayName"
                value={displayName}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Correo electrónico"
                type="email"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type="password"
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirmar contraseña"
                type="password"
                fullWidth
                name="confirmPassword"
                value={confirmPassword}
                onChange={onInputChange}
                error={passwordError !== ''}
                helperText={passwordError}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                label="Género"
                fullWidth
                name="gender"
                value={gender}
                onChange={onInputChange}
              >
                <MenuItem value="masculino">Masculino</MenuItem>
                <MenuItem value="femenino">Femenino</MenuItem>
                <MenuItem value="otro">Otro</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Alert severity="error" style={{ display: errorMessage ? 'block' : 'none', marginTop: '8px' }}>
                {errorMessage}
              </Alert>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                Registrarse
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" fullWidth onClick={onGoogleSignIn} startIcon={<GoogleIcon />}>
                Registrarse con Google
              </Button>
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <Link component={RouterLink} color="inherit" to="/auth/login">
                ¿Ya tienes una cuenta? Inicia sesión aquí
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </AuthLayout>
  );
};

