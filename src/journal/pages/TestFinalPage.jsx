import React, { useState } from "react";
import { Box, Button, Typography, Container, List, ListItem, ListItemText } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";
import { pagefunciones } from "../functions/index";

export const TestFinalPage = () => {
  const [results, setResults] = useState(null);
  const [showSaveAlert, setShowSaveAlert] = useState(false);

  const calculateResults = () => {
    // Simulación de respuestas del test (reemplazar con datos reales del test)
    const testResponses = {
      Kinesthetic: { 1: 5, 10: 4, 19: 3 }, // Ejemplo de respuestas para la categoría Kinesthetic
      Existential: { 2: 3, 11: 4, 20: 2 }, // Ejemplo de respuestas para la categoría Existential
      Interpersonal: { 3: 2, 12: 5, 21: 4 }, // Ejemplo de respuestas para la categoría Interpersonal
      Intrapersonal: { 4: 4, 13: 3, 22: 5 }, // Ejemplo de respuestas para la categoría Intrapersonal
      Logic: { 5: 3, 14: 5, 23: 4 }, // Ejemplo de respuestas para la categoría Logic
      Musical: { 6: 4, 15: 2, 24: 3 }, // Ejemplo de respuestas para la categoría Musical
      Naturalistic: { 7: 5, 16: 4, 25: 2 }, // Ejemplo de respuestas para la categoría Naturalistic
      Verbal: { 8: 3, 17: 5, 26: 4 }, // Ejemplo de respuestas para la categoría Verbal
      Visual: { 9: 4, 18: 3, 27: 5 }, // Ejemplo de respuestas para la categoría Visual
      // Agregar más categorías con sus respuestas
    };

    // Calcular los resultados con las respuestas del test
    const calculatedResults = pagefunciones.calculateMISResult(testResponses);
    setResults(calculatedResults);
  };

  const handleSaveResults = () => {
    setShowSaveAlert(true);
    // Implementar lógica para guardar resultados aquí
    console.log("Resultados guardados:", results);
  };

  return (
    <JournalLayout>
      <Container maxWidth="md">
        <Box sx={{ textAlign: "center", my: 4 }}>
          <Typography variant="h4" gutterBottom>
            Resultados del Test de Inteligencias Múltiples
          </Typography>
          <Typography variant="body1" gutterBottom>
            Aquí se muestran los resultados de las inteligencias múltiples y las carreras universitarias asociadas a cada inteligencia.
          </Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Button variant="contained" onClick={calculateResults} sx={{ mr: 2 }}>
                Mostrar Resultados
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <Button variant="contained" onClick={handleSaveResults} disabled={!results}>
                Guardar Resultados
              </Button>
            </motion.div>
          </Box>
          {showSaveAlert && (
            <Typography variant="body1" sx={{ mt: 2 }} color="success">
              ¡Los resultados han sido guardados!
            </Typography>
          )}
        </Box>
        {results && (
          <Box>
            <Typography variant="h5" gutterBottom>
              Resultados de inteligencias múltiples:
            </Typography>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={Object.keys(results.scores).map((intelligence) => ({
                  intelligence,
                  percentage: results.scores[intelligence],
                }))}
                margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
              >
                <XAxis dataKey="intelligence" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="percentage" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
              Carreras universitarias asociadas:
            </Typography>
            {Object.keys(results.careers).map((intelligence) => (
              <Box key={intelligence} mb={2}>
                <Typography variant="h6" gutterBottom sx={{ mb: 1, color: "#8884d8" }}>
                  {intelligence}:
                </Typography>
                <List dense>
                  {results.careers[intelligence].map((career, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Box
                        border={1}
                        borderRadius={5}
                        p={1}
                        mb={1}
                      >
                        <ListItem>
                          <ListItemText
                            primary={`${career.name} (${career.percentage}%)`}
                          />
                        </ListItem>
                      </Box>
                    </motion.div>
                  ))}
                </List>
              </Box>
            ))}
          </Box>
        )}
      </Container>
    </JournalLayout>
  );
};

