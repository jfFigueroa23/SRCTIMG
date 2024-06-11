import React, { useState, useEffect } from "react";
import { Box, Typography, Container, Button } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { Link } from "react-router-dom";
import axios from 'axios';

export const TestPageDos = () => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);

    axios.get('https://dfbb-177-230-65-177.ngrok-free.app/questions_f/get_all_questions/', {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      }
    })
    .then(response => {
      if (Array.isArray(response.data)) {
        setQuestions(response.data.slice(9, 18)); 
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

  const handleResponseSelect = (questionId, value) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [questionId]: value
    }));
  };

  const handleSaveData = () => {
    localStorage.setItem('testPageDosResponses', JSON.stringify(responses));
  };

  const isResponsesComplete = () => {
    const keys = questions.map((question) => question.id_question.toString());
    return keys.every((key) => responses.hasOwnProperty(key));
  };

  if (error) {
    return (
      <JournalLayout>
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", my: 4 }}>
            <Typography variant="h4" gutterBottom>
              Test de Inteligencias Múltiples - Parte 2
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
            Test de Inteligencias Múltiples - Parte 2
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
                Pregunta {index + 10}: {question.content}
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
            <Link to="/testtres" style={{ textDecoration: "none" }}>
              <Button 
                variant="contained" 
                disabled={!isResponsesComplete()} 
                onClick={handleSaveData}
              >
                Siguiente
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </JournalLayout>
  );
};
