import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Container, List, ListItem, ListItemText, Paper, Grow, Divider } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const generateRandomResults = () => {
  return {
    "Inteligencia Física": Math.floor(Math.random() * 101),
    "Inteligencia Emocional": Math.floor(Math.random() * 101),
    "Inteligencia Lógico-Matemática": Math.floor(Math.random() * 101),
    "Inteligencia Lingüística": Math.floor(Math.random() * 101),
    "Inteligencia Espacial": Math.floor(Math.random() * 101),
    "Inteligencia Musical": Math.floor(Math.random() * 101),
    "Inteligencia Intrapersonal": Math.floor(Math.random() * 101),
    "Inteligencia Interpersonal": Math.floor(Math.random() * 101),
    "Inteligencia Naturalista": Math.floor(Math.random() * 101),
  };
};

const careersByIntelligence = {
  "Inteligencia Física": ["Educación física", "Kinesiología", "Terapia física"],
  "Inteligencia Emocional": ["Psicología", "Trabajo social", "Consejería"],
  "Inteligencia Lógico-Matemática": ["Matemáticas", "Ingeniería", "Ciencias de la computación"],
  "Inteligencia Lingüística": ["Lenguas extranjeras", "Lingüística", "Comunicación"],
  "Inteligencia Espacial": ["Arquitectura", "Diseño gráfico", "Fotografía"],
  "Inteligencia Musical": ["Música", "Producción musical", "Composición"],
  "Inteligencia Intrapersonal": ["Filosofía", "Teología", "Medicina"],
  "Inteligencia Interpersonal": ["Pedagogía", "Liderazgo organizacional", "Trabajo en equipo"],
  "Inteligencia Naturalista": ["Biología", "Ecología", "Ciencias ambientales"],
};

export const TestFinalPage = () => {
  const [results, setResults] = useState(null);
  const [canSaveResults, setCanSaveResults] = useState(false);
  const [showSaveAlert, setShowSaveAlert] = useState(false);
  const location = useLocation();
  const responses = location.state?.responses || {};

  useEffect(() => {
    const calculatedResults = generateRandomResults();
    setResults(calculatedResults);
    setCanSaveResults(true);
  }, []);

  const handleSaveResults = () => {
    if (results) {
      console.log("Guardando resultados:", results);
      setShowSaveAlert(true);
    }
  };

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF6A00", "#FF2400", "#009E73", "#964B00"];

  return (
    <JournalLayout>
      <Container maxWidth="md">
        <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
          <Typography variant="h4" gutterBottom>
            Resultados del Test de Inteligencias Múltiples
          </Typography>
          <Typography variant="body1" gutterBottom>
            Aquí se muestran los resultados de las inteligencias múltiples y las carreras universitarias asociadas a cada inteligencia.
          </Typography>
          <Box display="flex" justifyContent="center" mt={2}>
            <Grow in={canSaveResults}>
              <Button variant="contained" onClick={handleSaveResults} disabled={!canSaveResults}>
                Guardar Resultados
              </Button>
            </Grow>
          </Box>
          {showSaveAlert && (
            <Typography variant="body1" sx={{ mt: 2 }} color="success">
              ¡Los resultados han sido guardados!
            </Typography>
          )}
        </Paper>
        {results && (
          <Box>
            <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
              <Typography variant="h5" gutterBottom>
                Resultados de inteligencias múltiples:
              </Typography>
              <PieChart width={500} height={300}>
                <Pie
                  data={Object.keys(results).map((intelligence) => ({
                    name: intelligence,
                    value: results[intelligence],
                  }))}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                >
                  {
                    Object.keys(results).map((intelligence, index) => (
                      <Cell key={intelligence} fill={COLORS[index % COLORS.length]} />
                    ))
                  }
                </Pie>
                <Tooltip />
                <Legend iconSize={10} layout="vertical" align="left" verticalAlign="middle" />
              </PieChart>
            </Paper>
            <Paper elevation={3} sx={{ padding: 3, marginBottom: 4 }}>
              <Typography variant="h5" gutterBottom>
                Carreras universitarias asociadas:
              </Typography>
              {Object.entries(results)
                .sort(([, a], [, b]) => b - a)
                .map(([intelligence, percentage]) => (
                  <Box key={intelligence} sx={{ marginBottom: 3 }}>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Typography variant="h6" gutterBottom>{intelligence} ({percentage}%):</Typography>
                    </motion.div>
                    <Divider />
                    <List>
                      {careersByIntelligence[intelligence].map((career) => (
                        <motion.div key={career} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <ListItem>
                            <ListItemText primary={career} />
                          </ListItem>
                        </motion.div>
                      ))}
                    </List>
                  </Box>
                ))}
            </Paper>
          </Box>
        )}
      </Container>
    </JournalLayout>
  );
};
