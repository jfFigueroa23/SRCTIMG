import React, { useState } from "react";
import {Box,Button,Container,Snackbar,TextField,Typography,} from "@mui/material";
import { Link } from "react-router-dom";
import {Email as EmailIcon,ArrowBack as ArrowBackIcon,} from "@mui/icons-material";
import { styled } from "@mui/system";
import { resetPassword } from "../../firebase/providers";

const AnimatedEmailIcon = styled(EmailIcon)(
  ({ theme, isVisible }) => `
    transition: opacity 0.3s ease-in-out;
    opacity: ${isVisible ? 1 : 0};
    margin-right: ${isVisible ? theme.spacing(1) : 0};
  `
);

export const ContrasenaPage = () => {
  const [email, setEmail] = useState("");
  const [isSnackbarOpen, setIsSnackbarOpen] = useState(false);
  const [isIconVisible, setIsIconVisible] = useState(true);

  const handleChange = (event) => {
    setEmail(event.target.value);
  };

  const handleFocus = () => {
    setIsIconVisible(false);
  };

  const handleBlur = () => {
    setIsIconVisible(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { ok, errorMessage } = await resetPassword(email); 
    if (ok) {
      setIsSnackbarOpen(true);
    } else {
      console.error(errorMessage);
    }
  };

  const handleSnackbarClose = () => {
    setIsSnackbarOpen(false);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Olvidaste tu Contraseña
        </Typography>
        <Typography variant="body1" gutterBottom>
          Ingresa tu dirección de correo electrónico y te enviaremos un enlace
          para restablecer tu contraseña.
        </Typography>
      </Box>
      <Box
        sx={{ mt: 4, width: "100%", display: "flex", justifyContent: "center" }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ width: "100%", maxWidth: "350px" }}
        >
          <TextField
            label="Correo Electrónico"
            variant="outlined"
            fullWidth
            value={email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            InputProps={{
              startAdornment: <AnimatedEmailIcon isVisible={isIconVisible} />,
            }}
          />
          <Box sx={{ mt: 2, display: "flex", justifyContent: "center" }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              endIcon={<EmailIcon />}
            >
              Enviar
            </Button>
          </Box>
        </form>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button
          component={Link}
          to="/login"
          startIcon={<ArrowBackIcon />}
          color="primary"
        >
          Regresar al Inicio de Sesión
        </Button>
      </Box>
      <Snackbar
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Se ha enviado un correo electrónico para restablecer tu contraseña."
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </Container>
  );
};