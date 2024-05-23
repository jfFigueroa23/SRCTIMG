import React, { useState, useEffect } from "react";
import { Box, Typography, Container, Slider, Button } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import axios from 'axios';
import { pagefunciones } from "../functions/index";
import { Link } from "react-router-dom";

export const TestPageTres = () => {
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState({});
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    axios.get('https://c4f5-177-230-73-82.ngrok-free.app/questions_f/get_all_questions/', {
      headers: {
        "ngrok-skip-browser-warning": "69420",
      }
    })
    .then(response => {
      if (Array.isArray(response.data)) {
        setQuestions(response.data.slice(19)); 
      } else {
        console.error('API NO FUNCIONA:', response.data);
        setError('Error: la respuesta de la API no es válida.');
      }
    })
    .catch(error => {
      console.error('ERROR EN CARGAR LAS PREGUNTAS!', error);
      setError('Error al obtener las preguntas. Por favor, intente nuevamente más tarde.');
    });

    // Obtener respuestas de las páginas anteriores
    const testPageResponses = JSON.parse(localStorage.getItem('testPageResponses')) || {};
    const testPageDosResponses = JSON.parse(localStorage.getItem('testPageDosResponses')) || {};

    // Combinar las respuestas de las páginas anteriores
    setResponses({ ...testPageResponses, ...testPageDosResponses });
  }, []);

  const handleSliderChange = (key, value) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [key]: value
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
    const keys = questions.map((question) => question.id_question.toString());
    return keys.every((key) => responses.hasOwnProperty(key));
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
                Pregunta {index + 20}: {question.content}
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
          <Link to="/testfinal" style={{ textDecoration: "none" }}>
            <Button variant="contained" disabled={!isResponsesComplete() || isSaving} onClick={handleSaveData}>
              {isSaving ? 'Guardando...' : 'Finalizar'}
            </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </JournalLayout>
  );
};
