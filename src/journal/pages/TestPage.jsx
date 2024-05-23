import React, { useState, useEffect } from "react";
import { Box, Typography, Container, Slider, Button } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom
import axios from 'axios';

export const TestPage = () => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    axios.get('https://486c-177-230-73-82.ngrok-free.app/questions_f/get_all_questions/', {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      }
    })
    .then(response => {
      if (Array.isArray(response.data)) {
        setQuestions(response.data.slice(0, 9)); 
      } else {
        console.error('API NO FUNCIONA:', response.data);
        setError('Error: la respuesta de la API no es válida.');
      }
    })
    .catch(error => {
      console.error('ERROR EN CARGAR LAS PREGUNTAS!', error);
      setError('Error al obtener las preguntas. Por favor, intente nuevamente más tarde.');
    });
  }, []);

  const handleSliderChange = (questionId, value) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [questionId]: value
    }));
  };

  const handleSaveData = () => {
    localStorage.setItem('testPageResponses', JSON.stringify(responses)); // Almacena las respuestas en el almacenamiento local
  };
  
  const isResponsesComplete = () => {
    return questions.every((question) => responses.hasOwnProperty(question.id_question));
  };

  if (error) {
    return (
      <JournalLayout>
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", my: 4 }}>
            <Typography variant="h4" gutterBottom>
              Test de Inteligencias Múltiples - Parte 1
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
            Test de Inteligencias Múltiples - Parte 1
          </Typography>
          <Typography variant="body1" gutterBottom>
            Por favor, responda las siguientes preguntas seleccionando el número que mejor describe su opinión.
          </Typography>
          <Box sx={{ border: "1px solid #ccc", borderRadius: "8px", p: 2, mt: 2 }}>
            <Typography variant="body2" gutterBottom>
              Su puntuación se utilizará para determinar su perfil de inteligencias múltiples. Un valor de 9 indica un nivel bajo, mientras que un valor de 1 indica un nivel alto.
            </Typography>
          </Box>
        </Box>
        <Box sx={{ textAlign: "left" }}>
          {questions.map((question, index) => (
            <Box key={question.id_question} mb={2}>
              <Typography variant="h6" gutterBottom>
                Pregunta {index + 1}: {question.content}
              </Typography>
              <Slider
                defaultValue={5}
                aria-labelledby={`discrete-slider-${question.id_question}`}
                valueLabelDisplay="auto"
                step={1}
                marks={[{ value: 1, label: '1' }, { value: 5, label: '5' }, { value: 9, label: '9' }]}
                min={1}
                max={9}
                onChange={(e, value) => handleSliderChange(question.id_question, value)}
              />
            </Box>
          ))}
          <Box mt={3} textAlign="center">
            {/* Utiliza Link para redireccionar a TestPageDos */}
            <Link to="/testdos" style={{ textDecoration: "none" }}>
              <Button 
                variant="contained" 
                disabled={!isResponsesComplete()} 
                onClick={handleSaveData}
              >
                Guardar
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </JournalLayout>
  );
};
