import axios from 'axios';
import Cookies from 'js-cookie';

export const pagefunciones = {
  saveData: async (responses) => {
    try {
      const token = Cookies.get('access_token');
      if (!token) {
        throw new Error('Token no encontrado');
      }

      const userResponse = await axios.get(`https://486c-177-230-73-82.ngrok-free.app/get_current_user?token=${token}`, {
        headers: { "ngrok-skip-browser-warning": "69420" }
      });

      // Verifica la estructura completa de la respuesta
      console.log('Respuesta completa de la API del usuario:', userResponse.data);

      const userId = userResponse.data.__data__.id_students;
      if (!userId) {
        throw new Error('userId no encontrado en la respuesta de la API');
      }

      const formattedResponses = formatResponses(responses);

      // Verificar la estructura de formattedResponses antes de enviar
      console.log('Datos formateados para enviar:', formattedResponses);
      
      // URL completa con parámetros
      const url = `https://486c-177-230-73-82.ngrok-free.app/response_f/getuserrespone?id_student=${userId}`;
      console.log('URL para la solicitud POST:', url);

      await axios.post(url, { list: formattedResponses }, { headers: { 'Content-Type': 'application/json' } });

      console.log('Datos guardados exitosamente en el backend');

    } catch (error) {
      console.error('Error al guardar los datos en el backend:', error);
    }
  }
};


const formatResponses = (responses) => {
  return [
    {
      "type_in": "Bodily/Kinesthetic",
      "result1": `1=${responses[1] || '0'}`,
      "result2": `10=${responses[10] || '0'}`,
      "result3": `19=${responses[19] || '0'}`
    },
    {
      "type_in": "Existential",
      "result1": `2=${responses[2] || '0'}`,
      "result2": `11=${responses[11] || '0'}`,
      "result3": `20=${responses[20] || '0'}`
    },
    {
      "type_in": "Interpersonal",
      "result1": `3=${responses[3] || '0'}`,
      "result2": `12=${responses[12] || '0'}`,
      "result3": `21=${responses[21] || '0'}`
    },
    {
      "type_in": "Intrapersonal",
      "result1": `4=${responses[4] || '0'}`,
      "result2": `13=${responses[13] || '0'}`,
      "result3": `22=${responses[22] || '0'}`
    },
    {
      "type_in": "Logical-Mathematical",
      "result1": `5=${responses[5] || '0'}`,
      "result2": `14=${responses[14] || '0'}`,
      "result3": `23=${responses[23] || '0'}`
    },
    {
      "type_in": "Musical",
      "result1": `6=${responses[6] || '0'}`,
      "result2": `15=${responses[15] || '0'}`,
      "result3": `24=${responses[24] || '0'}`
    },
    {
      "type_in": "Naturalistic",
      "result1": `7=${responses[7] || '0'}`,
      "result2": `16=${responses[16] || '0'}`,
      "result3": `25=${responses[25] || '0'}`
    },
    {
      "type_in": "Verbal",
      "result1": `8=${responses[8] || '0'}`,
      "result2": `17=${responses[17] || '0'}`,
      "result3": `26=${responses[26] || '0'}`
    },
    {
      "type_in": "Visual",
      "result1": `9=${responses[9] || '0'}`,
      "result2": `18=${responses[18] || '0'}`,
      "result3": `27=${responses[27] || '0'}`
    }
  ];
};
