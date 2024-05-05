// TestPageDos.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography, Container, Slider } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { pagefunciones } from "../functions/index";

const questions2 = [
  { name: "Disfruto de los juegos al aire libre.", key: 10 },
  { name: "Las preguntas sobre el significado de la vida son importantes para mí.", key: 11 },
  { name: "Aprendo mejor interactuando con los demás.", key: 12 },
  { name: "Me preocupan las cuestiones de justicia social.", key: 13 },
  { name: "Me frustro fácilmente con la gente desorganizada.", key: 14 },
  { name: "Siempre me ha interesado tocar un instrumento musical.", key: 15 },
  { name: "Los animales son importantes en mi vida.", key: 16 },
  { name: "Escribo por placer.", key: 17 },
  { name: "Puedo recordar cosas en imágenes mentales.", key: 18 },
];

export const TestPageDos = () => {
  const [responses, setResponses] = useState({});

  const handleSliderChange = (key, value) => {
    setResponses({ ...responses, [key]: value });
  };

  const handleNextPage = () => {
    pagefunciones.receiveDataFromTestPage(responses);
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
          </Typography>
        </Box>
        <Box sx={{ textAlign: "left" }}>
          {questions2.map((question) => (
            <Box key={question.key} mb={2}>
              <Typography variant="h6" gutterBottom>
                {question.name}
              </Typography>
              <Slider
                defaultValue={5}
                aria-labelledby="discrete-slider"
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
            <Link to="/testtres">
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
