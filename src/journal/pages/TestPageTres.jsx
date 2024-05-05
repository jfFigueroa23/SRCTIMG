// TestPageTres.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Box, Button, Typography, Container, Slider } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { pagefunciones } from "../functions/index";

const questions3 = [
  { name: "Me gusta trabajar con herramientas.", key: 19 },
  { name: "Disfruto discutiendo cuestiones sobre la vida.", key: 20 },
  { name: "Cosas como clubes y actividades extracurriculares son divertidas.", key: 21 },
  { name: "Aprendo mejor cuando tengo un vínculo emocional con el tema.", key: 22 },
  { name: "Las instrucciones paso a paso son de gran ayuda.", key: 23 },
  { name: "Me resulta fácil recordar las letras de las canciones.", key: 24 },
  { name: "El senderismo es una actividad agradable.", key: 25 },
  { name: "Me interesan los idiomas extranjeros.", key: 26 },
  { name: "Puedo imaginar ideas en mi mente.", key: 27 },
];

export const TestPageTres = () => {
  const [responses, setResponses] = useState({});

  const handleSliderChange = (key, value) => {
    setResponses({ ...responses, [key]: value });
  };

  const handleNextPage = () => {
    pagefunciones.receiveDataFromTestPage(responses);
  };
  

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
        </Box>
        <Box sx={{ textAlign: "left" }}>
          {questions3.map((question) => (
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
            <Link to="/testfinal">
              <Button variant="contained">
                Finalizar
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </JournalLayout>
  );
};
