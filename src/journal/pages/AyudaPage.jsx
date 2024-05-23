import React from 'react';
import { Box, Typography, Container, Accordion, AccordionSummary, AccordionDetails, Button, Link } from '@mui/material';
import { ExpandMore as ExpandMoreIcon } from '@mui/icons-material';
import { JournalLayout } from '../layout/JournalLayout';

export const AyudaPage = () => {
  

  return (
    <JournalLayout>
      <Container maxWidth="md">
        <Box sx={{ textAlign: 'center', my: 4 }}>
          <Typography variant="h4" gutterBottom>
            Ayuda y Preguntas Frecuentes
          </Typography>
        </Box>
        <Box sx={{ textAlign: 'left' }}>
          <Typography variant="h5" gutterBottom>
            Acerca de Howard Gardner y el Test de Múltiples Inteligencias
          </Typography>
          <Typography variant="body1" gutterBottom>
            Howard Gardner es un psicólogo y profesor de la Universidad de Harvard conocido por su teoría de las Inteligencias Múltiples. Su trabajo revolucionario sugiere que la inteligencia no es una sola capacidad, sino una variedad de capacidades y habilidades que se manifiestan de diferentes maneras en diferentes personas.
          </Typography>
          <Typography variant="body1" gutterBottom>
            El Test de Múltiples Inteligencias es una herramienta diseñada para evaluar las diferentes áreas de inteligencia propuestas por Howard Gardner en su teoría. Estas áreas incluyen inteligencia lingüística, lógico-matemática, espacial, musical, corporal-kinestésica, intrapersonal e interpersonal, entre otras.
          </Typography>
          <Accordion sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
              <Typography variant="h6">¿Cómo puedo mejorar mis resultados en el test?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Para mejorar tus resultados en el Test de Múltiples Inteligencias, te recomendamos explorar diferentes actividades y áreas de interés. Dedica tiempo a desarrollar habilidades en las áreas en las que te sientas menos fuerte y busca oportunidades para practicar y aprender.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel2a-content" id="panel2a-header">
              <Typography variant="h6">¿Cuánto tiempo dura el test?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                El test está diseñado para ser completado en aproximadamente 15 minutos. 
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel3a-content" id="panel3a-header">
              <Typography variant="h6">¿Cómo puedo guardar mis resultados?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Una vez que completes el test, tendrás la opción de guardar tus resultados. Simplemente sigue las instrucciones en pantalla y tus resultados serán guardados automáticamente.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel4a-content" id="panel4a-header">
              <Typography variant="h6">¿Puedo retomar el test más tarde?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                No, el test está diseñado para ser completado en una sola sesión. Te recomendamos completarlo en un entorno tranquilo y sin distracciones para obtener resultados precisos.
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel5a-content" id="panel5a-header">
              <Typography variant="h6">¿Qué hago si tengo problemas técnicos?</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                Si encuentras problemas técnicos mientras realizas el test, intenta recargar la página o revisar tu conexión a Internet. 
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      </Container>
    </JournalLayout>
  );
};
