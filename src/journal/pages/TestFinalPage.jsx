import React, { useState, useEffect } from "react";
import { Box, Typography, Container, List, ListItem, ListItemText, Paper, Divider, Button } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout";
import { motion } from "framer-motion";
import axios from 'axios';
import Cookies from 'js-cookie';

const medals = ["🥇", "🥈", "🥉"];

export const TestFinalPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [userName, setUserName] = useState('');
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const token = Cookies.get('access_token');
        if (!token) {
          throw new Error('Token no encontrado');
        }

        const userResponse = await axios.get(`https://dfbb-177-230-65-177.ngrok-free.app/get_current_user?token=${token}`, {
          headers: { "ngrok-skip-browser-warning": "69420" }
        });

        const userId = userResponse.data.__data__.id_students;
        const userName = userResponse.data.__data__.name; 
        if (!userId) {
          throw new Error('ID del estudiante no encontrada en la respuesta de la API');
        }
        setUserName(userName);
        console.log('ID del estudiante:', userId); 

        const response = await axios.get(`https://dfbb-177-230-65-177.ngrok-free.app/results_f/sendresultsclient/?id_student=${userId}`, {
          headers: { 'accept': 'application/json', "ngrok-skip-browser-warning": "69420" }
        });

        if (!Array.isArray(response.data)) {
          throw new Error('La respuesta no es un array');
        }

        console.log('Resultados obtenidos:', response.data);

        const parsedResults = response.data.map((item) => {
          try {
            return JSON.parse(item);
          } catch (error) {
            console.error('Error al parsear el objeto JSON:', error);
            return null;
          }
        }).filter((item) => item !== null);

        console.log('Resultados parseados:', parsedResults); 

        setResults(parsedResults);
      } catch (error) {
        console.error("Error al obtener los resultados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, []);

  const getBoxShadow = (index) => {
    switch(index) {
      case 0: return "0px 4px 20px rgba(255, 215, 0, 0.8)";  // Oro
      case 1: return "0px 4px 20px rgba(192, 192, 192, 0.8)"; // Plata
      case 2: return "0px 4px 20px rgba(205, 127, 50, 0.8)";  // Bronce
      default: return "0px 2px 10px rgba(0, 0, 0, 0.1)";      
    }
  };

  const getBorder = (index) => {
    switch(index) {
      case 0: return "2px solid #ffd700";  // Oro
      case 1: return "2px solid #c0c0c0";  // Plata
      case 2: return "2px solid #cd7f32";  // Bronce
      default: return "1px solid #ddd";    
    }
  };

  const getBackgroundColor = (index) => {
    switch(index) {
      case 0: return "rgba(255, 223, 0, 0.1)";  // Oro
      case 1: return "rgba(192, 192, 192, 0.1)"; // Plata
      case 2: return "rgba(205, 127, 50, 0.1)";  // Bronce
      default: return "transparent";             
    }
  };

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <JournalLayout>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" sx={{ color: '#000', fontWeight: 'bold', marginBottom: 4 }}>
          {`Resultados del Test de Inteligencias Múltiples, ${userName}`}
        </Typography>
        {!isLoading && results.length > 0 ? (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', mb: 4 }}>
              {[1, 0, 2].map((index) => (
                <Box key={index} sx={{ width: '30%', textAlign: 'center' }}>
                  <Paper 
                    elevation={3} 
                    sx={{ 
                      padding: 3, 
                      borderRadius: '20px', 
                      boxShadow: getBoxShadow(index), 
                      border: getBorder(index),
                      backgroundColor: getBackgroundColor(index),
                      position: 'relative'
                    }}
                  >
                    <Box
                      component="span"
                      sx={{
                        position: 'absolute',
                        top: '-15px',
                        right: '-15px',
                        fontSize: '2rem'
                      }}
                    >
                      {medals[index]}
                    </Box>
                    {Object.entries(results[index]).map(([intelligence, careers], intelligenceIndex) => (
                      <Box key={intelligenceIndex} sx={{ marginBottom: 3 }}>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                          <Typography 
                            variant="h5" 
                            align="center" 
                            sx={{ 
                              color: '#2196F3', 
                              fontWeight: 'bold', 
                              marginBottom: 1, 
                              textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)'
                            }}
                          >
                            {intelligence}
                          </Typography>
                        </motion.div>
                        <Divider sx={{ backgroundColor: '#2196F3', marginBottom: 1 }} />
                        <Typography variant="subtitle1" align="center" sx={{ color: '#555', marginBottom: 1 }}>
                          Estas son las carreras recomendadas:
                        </Typography>
                        <List dense>
                          {careers.map((career, careerIndex) => (
                            <motion.div 
                              key={careerIndex} 
                              whileHover={{ scale: 1.05 }} 
                              whileTap={{ scale: 0.95 }}
                            >
                              <ListItem sx={{ paddingLeft: 0 }}>
                                <ListItemText primary={career.Career} sx={{ color: '#333'
                              }} />
                              </ListItem>
                            </motion.div>
                          ))}
                        </List>
                      </Box>
                    ))}
                  </Paper>
                </Box>
              ))}
            </Box>
            {expanded && (
              <>
                {results.slice(3).map((result, index) => (
                  <Box key={index} sx={{ marginBottom: 4 }}>
                    <Paper 
                      elevation={3} 
                      sx={{ 
                        padding: 3, 
                        borderRadius: '20px', 
                        boxShadow: getBoxShadow(index + 3), 
                        border: getBorder(index + 3),
                        backgroundColor: getBackgroundColor(index + 3)
                      }}
                    >
                      {Object.entries(result).map(([intelligence, careers], intelligenceIndex) => (
                        <Box key={intelligenceIndex} sx={{ marginBottom: 3 }}>
                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Typography 
                              variant="h5" 
                              align="center" 
                              sx={{ 
                                color: '#2196F3', 
                                fontWeight: 'bold', 
                                marginBottom: 1, 
                                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.3)'
                              }}
                            >
                              {intelligence}
                            </Typography>
                          </motion.div>
                          <Divider sx={{ backgroundColor: '#2196F3', marginBottom: 1 }} />
                          <Typography variant="subtitle1" align="center" sx={{ color: '#555', marginBottom: 1 }}>
                            Estas son las carreras recomendadas:
                          </Typography>
                          <List dense>
                            {careers.map((career, careerIndex) => (
                              <motion.div 
                                key={careerIndex} 
                                whileHover={{ scale: 1.05 }} 
                                whileTap={{ scale: 0.95 }}
                              >
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
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                  <Button onClick={handleExpand} variant="outlined">
                    Ver menos
                  </Button>
                </Box>
              </>
            )}
            {!expanded && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button onClick={handleExpand} variant="outlined">
                  Ver más
                </Button>
              </Box>
            )}
          </>
        ) : (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Typography variant="body1">{isLoading ? "Cargando resultados..." : "No se encontraron resultados."}</Typography>
          </Box>
        )}
      </Container>
    </JournalLayout>
  );
};
