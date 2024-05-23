import React, { useState, useEffect } from "react";
import { Box, Typography, Container, List, ListItem, ListItemText, Paper, Divider } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { motion } from "framer-motion";
import axios from 'axios';
import Cookies from 'js-cookie';

// Función para eliminar resultados duplicados
const removeDuplicates = (arr) => {
  const uniqueResults = [];
  const seen = new Set();
  arr.forEach((result) => {
    const serializedResult = JSON.stringify(result);
    if (!seen.has(serializedResult)) {
      seen.add(serializedResult);
      uniqueResults.push(result);
    }
  });
  return uniqueResults;
};

export const TestFinalPage = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = Cookies.get('access_token');
        if (!token) {
          throw new Error('Token no encontrado');
        }

        const userResponse = await axios.get(`https://486c-177-230-73-82.ngrok-free.app/get_current_user?token=${token}`, {
          headers: { "ngrok-skip-browser-warning": "69420" }
        });

        const userId = userResponse.data.__data__.id_students;
        if (!userId) {
          throw new Error('userId no encontrado en la respuesta de la API');
        }

        const response = await axios.get(`https://486c-177-230-73-82.ngrok-free.app/results_f/sendresultsclient/?id_student=${userId}`, {
          headers: { 'accept': 'application/json', "ngrok-skip-browser-warning": "69420" }
        });

        // Maneja diferentes casos de respuesta aquí
        if (!Array.isArray(response.data)) {
          throw new Error('La respuesta no es un array');
        }

        const parsedResults = response.data.map((item) => {
          try {
            return JSON.parse(item);
          } catch (error) {
            console.error('Error al parsear el objeto JSON:', error);
            return null;
          }
        }).filter((item) => item !== null);

        // Filtra los resultados para evitar repeticiones
        const uniqueResults = removeDuplicates(parsedResults);

        // Ordena los resultados de mayor a menor
        const sortedResults = uniqueResults.sort((a, b) => {
          const aTotal = Object.values(a).flat().length;
          const bTotal = Object.values(b).flat().length;
          return bTotal - aTotal;
        });

        setResults(sortedResults);
      } catch (error) {
        console.error("Error al obtener los resultados:", error);
      }
    };

    fetchResults();
  }, []);

  return (
    <JournalLayout>
      <Container maxWidth="md">
        {results.map((result, index) => (
          <Box key={index} sx={{ marginBottom: 4 }}>
            <Paper elevation={3} sx={{ padding: 3, borderRadius: '20px', boxShadow: '0px 5px 10px rgba(0, 0, 0, 0.1)' }}>
              <Typography variant="h4" align="center" sx={{ color: '#4CAF50', fontWeight: 'bold', marginBottom: 2 }}>
                Resultados del Test de Inteligencias Múltiples
              </Typography>
              {Object.entries(result).map(([intelligence, careers], intelligenceIndex) => (
                <Box key={intelligenceIndex} sx={{ marginBottom: 3 }}>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Typography variant="h5" align="center" sx={{ color: '#2196F3', fontWeight: 'bold', marginBottom: 1 }}>
                      {intelligenceIndex === 0 ? "🥇" : intelligenceIndex === 1 ? "🥈" : intelligenceIndex === 2 ? "🥉" : null} {intelligence}:
                    </Typography>
                  </motion.div>
                  <Divider sx={{ backgroundColor: '#2196F3' }} />
                  <List>
                    {careers.map((career, careerIndex) => (
                      <motion.div key={careerIndex} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <ListItem sx={{ paddingLeft: 0 }}>
                          <ListItemText primary={career.Career} sx={{ color: '#333' }} />
                        </ListItem>
                      </motion.div>
                    ))}
                  </List>
                </Box>
              ))}
            </Paper>
          </Box>
        ))}
      </Container>
    </JournalLayout>
  );
};
