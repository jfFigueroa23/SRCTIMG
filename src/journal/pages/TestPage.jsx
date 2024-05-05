// TestPage.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Typography, Container, Slider, Button } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { pagefunciones } from "../functions/index";

const questions1 = [
  { name: "Vivo un estilo de vida activo.", key: 1 },
  { name: "Los ejercicios de meditación son gratificantes.", key: 2 },
  { name: "Soy un 'jugador de equipo'.", key: 3 },
  { name: "La equidad es importante para mí.", key: 4 },
  { name: "La estructura me ayuda a tener éxito.", key: 5 },
  { name: "Disfruto de muchos tipos de música.", key: 6 },
  { name: "Mi casa cuenta con un sistema de reciclaje.", key: 7 },
  { name: "Llevo un diario.", key: 8 },
  { name: "Disfruto haciendo rompecabezas tridimensionales.", key: 9 },
];

export const TestPage = () => {
  const [responses, setResponses] = useState({});

  const handleSliderChange = (key, value) => {
    setResponses({ ...responses, [key]: value });
  };

  const handleNextPage = () => {
    pagefunciones.receiveDataFromTestPage(responses); // Corregir el nombre de la función
  };
  
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
        </Box>
        <Box sx={{ textAlign: "left" }}>
          {questions1.map((question) => (
            <Box key={question.key} mb={2}>
              <Typography variant="h6" gutterBottom>
                {question.name}
              </Typography>
              <Slider
                defaultValue={5}
                aria-labelledby={`discrete-slider-${question.key}`}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={9}
                onChange={(e, value) => handleSliderChange(question.key, value)}
              />
            </Box>
          ))}
          <Box mt={3} textAlign="center">
            <Link to="/testdos">
              <Button variant="contained">
                Siguiente
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </JournalLayout>
  );
};
