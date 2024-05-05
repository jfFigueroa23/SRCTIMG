import { useState } from 'react';
import { Box, Button, Grid, TextField, Typography, Link, IconButton, MenuItem, CircularProgress } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Google as GoogleIcon, Email as EmailIcon, Lock as LockIcon, Phone as PhoneIcon, CalendarToday as CalendarIcon, School as SchoolIcon, Person as PersonIcon } from '@mui/icons-material'; // Importar PersonIcon
import { AuthLayout } from '../layout/AuthLayout';
import { startGoogleSignIn, startCreatingUserWithEmailPassword } from '../../store/auth';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from '@mui/material';
import { useForms } from '../../hooks';

const initialFormData = {
  name: '',
  phone: '',
  email: '',
  birthDate: '',
  gender: '',
  school: '',
  password: '',
  confirmPassword: '',
};

export const RegisterPage = () => {
  const { errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [passwordError, setPasswordError] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);

  const { 
    name,
    phone,
    email,
    birthDate,
    gender,
    school,
    password, 
    confirmPassword, 
    onInputChange 
  } = useForms(initialFormData);

  const onSubmit = async (event) => {
    event.preventDefault();
    
    // Validar si las contraseñas coinciden
    if (password !== confirmPassword) {
      setPasswordError('Las contraseñas no coinciden');
      return;
    }

    // Resetear el mensaje de error y establecer el estado de registro
    setPasswordError('');
    setIsRegistering(true);

    // Dispatch de la acción de registro
    await dispatch(startCreatingUserWithEmailPassword({ 
      name,
      phone,
      email,
      birthDate,
      gender,
      school,
      password, 
    }));

    // Restablecer el estado de registro
    setIsRegistering(false);
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
          animation: 'fadeInUp 0.5s ease-in-out',
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Registro
        </Typography>
        <form onSubmit={onSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre"
                type="text"
                fullWidth
                name="name"
                value={name}
                onChange={onInputChange}
                InputProps={{
                  startAdornment: <IconButton><LockIcon /></IconButton>,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Teléfono"
                type="tel"
                fullWidth
                name="phone"
                value={phone}
                onChange={onInputChange}
                InputProps={{
                  startAdornment: <IconButton><PhoneIcon /></IconButton>,
                }}
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
                InputProps={{
                  startAdornment: <IconButton><EmailIcon /></IconButton>,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Fecha de nacimiento"
                type="date"
                fullWidth
                name="birthDate"
                value={birthDate}
                onChange={onInputChange}
                InputProps={{
                  startAdornment: <IconButton><CalendarIcon /></IconButton>,
                }}
                InputLabelProps={{ shrink: true }}
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
                InputProps={{
                  startAdornment: <IconButton><PersonIcon /></IconButton>, // Cambiar a PersonIcon
                }}
              >
                <MenuItem value="masculino">Masculino</MenuItem>
                <MenuItem value="femenino">Femenino</MenuItem>
                <MenuItem value="otro">Otro</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Escuela"
                type="text"
                fullWidth
                name="school"
                value={school}
                onChange={onInputChange}
                InputProps={{
                  startAdornment: <IconButton><SchoolIcon /></IconButton>,
                }}
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
                InputProps={{
                  startAdornment: <IconButton><LockIcon /></IconButton>,
                }}
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
                InputProps={{
                  startAdornment: <IconButton><LockIcon /></IconButton>,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Alert severity="error" style={{ display: errorMessage ? 'block' : 'none', marginTop: '8px' }}>
                {errorMessage}
              </Alert>
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                {isRegistering ? <CircularProgress size={24} /> : "Registrarse"}
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
