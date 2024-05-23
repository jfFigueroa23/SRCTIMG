import { Box, Button, Typography, CircularProgress, Fade } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Assessment as AssessmentIcon } from "@mui/icons-material";

export const JournalPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <JournalLayout>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "90vh",
          maxWidth: "400px",
          mx: "auto",
          my: "auto",
          p: 2,
          animation: "fadeInUp 0.5s ease-in-out",
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          ¡Bienvenido al Test de Múltiples Inteligencias!
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Realiza el test para descubrir qué tipo de inteligencia posees y
          encontrar la carrera universitaria ideal para ti.
        </Typography>

        <Fade in={!isLoading} timeout={1000}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
            <Button
              component={Link}
              to="/test"
              variant="contained"
              startIcon={<AssessmentIcon />}
            >
              Iniciar Test
            </Button>
          </Box>
          
        </Fade>

        {isLoading && (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </JournalLayout>
  );
};
