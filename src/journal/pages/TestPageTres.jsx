import React, { useState, useEffect } from "react";
import { Box, Typography, Container, Button, Snackbar } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import axios from 'axios';
import { pagefunciones } from "../functions/index";
import { Link } from "react-router-dom";

export const TestPageTres = () => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    axios.get('https://dfbb-177-230-65-177.ngrok-free.app/questions_f/get_all_questions/', {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      }
    })
    .then(response => {
      if (Array.isArray(response.data)) {
        setQuestions(response.data.slice(18)); 
      } else {
        console.error('API NO FUNCIONA:', response.data);
        setError('Error: la respuesta de la API no es válida.');
      }
    })
    .catch(error => {
      console.error('ERROR EN CARGAR LAS PREGUNTAS!', error);
      setError('Error al obtener las preguntas. Por favor, intente nuevamente más tarde.');
    });

    const testPageResponses = JSON.parse(localStorage.getItem('testPageResponses')) || {};
    const testPageDosResponses = JSON.parse(localStorage.getItem('testPageDosResponses')) || {};

    setResponses({ ...testPageResponses, ...testPageDosResponses });
  }, []);

  const handleResponseSelect = (questionId, value) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [questionId]: value
    }));
  };

  const handleSaveData = async () => {
    setIsSaving(true);
    try {
      await pagefunciones.saveData(responses);
      console.log('Datos guardados exitosamente en el backend');
    } catch (error) {
      console.error('Error al guardar los datos en el backend:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const isResponsesComplete = () => {
    return questions.every((question) => responses.hasOwnProperty(question.id_question));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (error) {
    return (
      <JournalLayout>
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", my: 4 }}>
            <Typography variant="h4" gutterBottom>
              Test de Inteligencias Múltiples - Parte 3
            </Typography>
            <Typography variant="body1" gutterBottom color="error">
              {error}
            </Typography>
          </Box>
        </Container>
      </JournalLayout>
    );
  }

  return (
    <JournalLayout>
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", my: 4 }}>
          <Typography variant="h4" gutterBottom>
            Test de Inteligencias Múltiples - Parte 3
          </Typography>
          <Typography variant="body1" gutterBottom>
            Por favor, responda las siguientes preguntas seleccionando el número que mejor describe su opinión.
            TOMA EN CUENTA QUE 1 ES EL MAXIMO Y 9 ES EL MINIMO... 

          </Typography>
        </Box>
        <Box sx={{ textAlign: "left" }}>
          {questions.map((question, index) => (
            <Box key={question.id_question} mb={2}>
              <Typography variant="h6" gutterBottom>
                Pregunta {index + 19}: {question.content}
              </Typography>
              <Box display="flex" justifyContent="center" mt={2}>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(option => (
                  <Button
                    key={option}
                    variant={responses[question.id_question] === option ? "contained" : "outlined"}
                    onClick={() => handleResponseSelect(question.id_question, option)}
                    sx={{ mx: 1 }}
                  >
                    {option}
                  </Button>
                ))}
              </Box>
            </Box>
          ))}
          <Box mt={3} textAlign="center">
            <Link to="/testfinal" style={{ textDecoration: "none" }}>
              <Button 
                variant="contained" 
                disabled={!isResponsesComplete() || isSaving} 
                onClick={handleSaveData}
              >
                {isSaving ? 'Guardando...' : 'Finalizar'}
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message="¡No se pueden seleccionar respuestas repetidas!"
      />
    </JournalLayout>
  );
};
