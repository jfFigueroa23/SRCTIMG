import { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { pagefunciones } from './pagefunciones';

export const useFunctions = () => {
  const [responses, setResponses] = useState({});
  const {} = pagefunciones


  const guardarRespuesta = (key, value) => {
    setResponses(prev => ({ ...prev, [key]: value }));
  };

  const obtenerRespuestasParte3 = () => {
    return responses;

  };

  const saveData = async () => {
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

      const formattedResponses = formatResponses(responses);

      const url = `https://486c-177-230-73-82.ngrok-free.app/response_f/getuserrespone/${userId}`;

      const postData = {
        list: formattedResponses.map(response => ({
          type_in: response.type_in,
          answers: Object.values(response)
        }))
      };

      await axios.post(url, postData, { headers: { 'Content-Type': 'application/json' } });

      console.log('Datos guardados exitosamente en el backend');
    } catch (error) {
      console.error('Error al guardar los datos en el backend:', error);
    }
  };

  const formatResponses = (responses) => {
    const formatted = [];

    const intelligenceTypes = [
      "Bodily/Kinesthetic",
      "Existential",
      "Interpersonal",
      "Intrapersonal",
      "Logical-Mathematical",
      "Musical",
      "Naturalistic",
      "Verbal",
      "Visual"
    ];

    intelligenceTypes.forEach((type, index) => {
      const responseIndex = index * 3;
      const responseObj = {
        type_in: type
      };

      for (let i = 0; i < 3; i++) {
        const questionNumber = responseIndex + i + 1;
        const responseKey = `Parte3_${questionNumber}`;
        const responseValue = responses[responseKey] || '0';
        responseObj[`result${i + 1}`] = `${questionNumber}=${responseValue}`;
      }

      formatted.push(responseObj);
    });

    return formatted;
  };

  return {
    guardarRespuesta,
    obtenerRespuestasParte3,
    saveData
  };
};
