import { Box, Grid, Button, TextField, Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { Google as GoogleIcon } from '@mui/icons-material';
import { AuthLayout } from '../layout/AuthLayout';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth';
import { useDispatch, useSelector } from 'react-redux';
import { useMemo } from 'react';
import { Alert } from '@mui/material';

const initialFormData = {
  email: '',
  password: '',
};

export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { email, password, onInputChange } = useForm(initialFormData);
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
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Correo"
                type="email"
                placeholder="correo@google.com"
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
                placeholder="Contraseña"
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
              />
            </Grid>

            <Grid item xs={12}>
              <Alert severity="error" style={{ display: errorMessage ? 'block' : 'none', marginTop: '8px' }}>
                {errorMessage}
              </Alert>
            </Grid>

            <Grid item xs={12}>
              <Button disabled={isAuthenticating} type="submit" variant="contained" fullWidth>
                Login
              </Button>
            </Grid>

            <Grid item xs={12}>
              <Button
                disabled={isAuthenticating}
                variant="contained"
                fullWidth
                onClick={onGoogleSignIn}
                startIcon={<GoogleIcon />}
              >
                Iniciar sesión con Google
              </Button>
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'right' }}>
              <Link component={RouterLink} color="inherit" to="/auth/register">
                Crear una cuenta
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </AuthLayout>
  );
};
