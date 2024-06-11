import { Box, Button, Typography, CircularProgress, Fade } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Assessment as AssessmentIcon } from "@mui/icons-material";
import axios from 'axios';
import Cookies from 'js-cookie';

export const JournalPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasResults, setHasResults] = useState(false);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState(''); 

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = Cookies.get('access_token');
        if (!token) {
          throw new Error('Token no encontrado');
        }

        const userResponse = await axios.get(`https://d72b-2806-2f0-21c0-ff5a-51cb-d6be-3ad9-b539.ngrok-free.app/token=${token}`, {
          headers: { "ngrok-skip-browser-warning": "69420" }
        });

        const user = userResponse.data.__data__;
        setUserId(user.id_students);
        setUserName(user.name); 
        console.log('User ID:', user.id_students);

      
        const resultsStatusResponse = await axios.get(`https://dfbb-177-230-65-177.ngrok-free.app/results_f/check_results/?id_student=${user.id_students}`, {
          headers: { 
            "ngrok-skip-browser-warning": "69420",
            "Authorization": `Bearer ${token}`,
            'accept': 'application/json'
          }
        });

        const resultsStatusData = resultsStatusResponse.data;
        if (resultsStatusData.message === "The student has already answer the test") {
          setHasResults(true);
        }
        console.log('Results Message:', resultsStatusData.message);
      } catch (error) {
        console.error('Error al obtener los datos del usuario o verificar el estado de los resultados:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
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
        }}
      >
        <Typography variant="h4" align="center" gutterBottom>
          Hola, {userName}!
        </Typography>
        <Typography variant="h4" align="center" gutterBottom>
          ¡Bienvenido al Test de Múltiples Inteligencias!
        </Typography>
        <Typography variant="body1" align="center" gutterBottom>
          Realiza el test para descubrir qué tipo de inteligencia posees y
          encontrar la carrera universitaria ideal para ti.
        </Typography>

        <Fade in={!isLoading} timeout={1000}>
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 4 }}>
            {hasResults ? (
              <Button
                component={Link}
                to={`/test`}
                variant="contained"
                color="primary"
                size="large"
                startIcon={<AssessmentIcon />}
                sx={{ mb: 2 }}
              >
                INICIAR TEST
              </Button>
            ) : (
              <Button
                component={Link}
                to="/test"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<AssessmentIcon />}
                sx={{ mb: 2 }}
              >
                INICIAR TEST
              </Button>
            )}
            {hasResults && (
              <Button
                component={Link}
                to="/testfinal"
                variant="contained"
                color="secondary"
                size="large"
                startIcon={<AssessmentIcon />}
              >
                VER RESULTADOS
              </Button>
            )}
            <Button
              component="a"
              href="https://forms.gle/t59ec9tAD3f7QSx49"
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              color="info"
              size="large"
              sx={{ mt: 2 }}
            >
              Botón SUS
            </Button>
            <Button
              component="a"
              href="https://forms.gle/Myqri1UAnwLyVXmc8"
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              color="success"
              size="large"
              sx={{ mt: 2 }}
            >
              Botón SUM
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
