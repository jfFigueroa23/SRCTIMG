import { Box, Button, Typography, CircularProgress } from "@mui/material";
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

        {isLoading ? (
          <CircularProgress />
        ) : (
          <Button
            component={Link}
            to="/test"
            variant="contained"
            startIcon={<AssessmentIcon />}
            sx={{ mt: 2 }}
          >
            Iniciar Test
          </Button>
        )}
      </Box>
    </JournalLayout>
  );
};
