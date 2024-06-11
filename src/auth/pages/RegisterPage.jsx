import React, { useState } from 'react';
import { Box, Button, Grid, TextField, Typography, Link, IconButton, MenuItem, CircularProgress } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Google as GoogleIcon, Email as EmailIcon, Lock as LockIcon, Phone as PhoneIcon, CalendarToday as CalendarIcon, School as SchoolIcon, Person as PersonIcon, Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForms } from '../../hooks';
import Cookies from 'js-cookie';

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
  const [errors, setErrors] = useState({});
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

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

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = name ? '' : 'El nombre es requerido';
    tempErrors.phone = phone.length === 10 ? '' : 'El teléfono debe tener 10 dígitos';
    tempErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? '' : 'Email no válido';
    tempErrors.password = password.length >= 6 ? '' : 'La contraseña debe tener al menos 6 caracteres';
    tempErrors.confirmPassword = password === confirmPassword ? '' : 'Las contraseñas no coinciden';
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === '');
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;

    setIsRegistering(true);
    try {
      const response = await fetch('https://dfbb-177-230-65-177.ngrok-free.app/students_f/create_students', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          telf: phone,
          email,
          birth_date: birthDate,
          gender,
          School: school,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Error en el registro');
      }

      const data = await response.json();
      const { token } = data;
      Cookies.set('auth_token', token, { expires: 100 }); 
      navigate('/inicio');
    } catch (error) {
      console.error('Error al registrar usuario:', error);
    } finally {
      setIsRegistering(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
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
                error={!!errors.name}
                helperText={errors.name}
                InputProps={{
                  startAdornment: <IconButton tabIndex={-1}> <PersonIcon /> </IconButton>,
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
                error={!!errors.phone}
                helperText={errors.phone}
                InputProps={{
                  startAdornment: <IconButton tabIndex={-1}> <PhoneIcon /></IconButton>,
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
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: <IconButton tabIndex={-1}> <EmailIcon /></IconButton>,
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
                  startAdornment: <IconButton tabIndex={-1}> <CalendarIcon /></IconButton>,
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
                  startAdornment: <IconButton tabIndex={-1}> <PersonIcon /></IconButton>,
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
                  startAdornment: <IconButton  tabIndex={-1}> <SchoolIcon /></IconButton>,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Contraseña"
                type={showPassword ? 'text' : 'password'}
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  startAdornment: <IconButton tabIndex={-1} onClick={toggleShowPassword}> {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton>,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Confirmar contraseña"
                type={showConfirmPassword ? 'text' : 'password'}
                fullWidth
                name="confirmPassword"
                value={confirmPassword}
                onChange={onInputChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  startAdornment: <IconButton tabIndex={-1} onClick={toggleShowConfirmPassword}> {showConfirmPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}</IconButton>,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" fullWidth>
                {isRegistering ? <CircularProgress size={24} /> : "Registrarse"}
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

