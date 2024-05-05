export const pagefunciones = {
  saveData: (data) => {
    console.log("Datos guardados:", data);
  },
  receiveDataFromTestPage: (data, responses) => {
    responses = responses || {};
    responses = { ...responses, ...data };
    return responses; // Devolvemos las respuestas actualizadas
},


  
calculateMISResult: (responses) => {
  const categories = {
    Kinesthetic: [1, 10, 19],
    Existential: [2, 11, 20],
    Interpersonal: [3, 12, 21],
    Intrapersonal: [4, 13, 22],
    Logic: [5, 14, 23],
    Musical: [6, 15, 24],
    Naturalistic: [7, 16, 25],
    Verbal: [8, 17, 26],
    Visual: [9, 18, 27],
  };

  let scores = {};

  // Calcular la puntuación para cada categoría basada en las respuestas del usuario
  Object.keys(categories).forEach((category) => {
    const questionNumbers = categories[category];
    let score = 0;

    // Sumar las respuestas del usuario para las preguntas en esta categoría
    questionNumbers.forEach((questionNumber) => {
      score += (responses[category] || {})[questionNumber] || 0;
    });

    // Almacenar la puntuación para esta categoría
    scores[category] = score;
  });

  // Encontrar la categoría preferida (puntuación más baja)
  let preferredCategory = Object.keys(scores)[0];
  let lowestScore = scores[preferredCategory];

  Object.keys(scores).forEach((category) => {
    if (scores[category] < lowestScore) {
      lowestScore = scores[category];
      preferredCategory = category;
    }
  });

  // Asignar carreras basadas en la categoría preferida
  const careers = {
    Kinesthetic: [
      { name: "Fisioterapia", percentage: Math.floor(Math.random() * 100) + 1 },
      { name: "Danza", percentage: Math.floor(Math.random() * 100) + 1 },
      { name: "Entrenamiento Deportivo", percentage: Math.floor(Math.random() * 100) + 1 },
    ],
    Existential: [
      { name: "Filosofía", percentage: Math.floor(Math.random() * 100) + 1 },
      { name: "Teología", percentage: Math.floor(Math.random() * 100) + 1 },
      { name: "Antropología", percentage: Math.floor(Math.random() * 100) + 1 },
    ],
    Interpersonal: [
      { name: "Psicología", percentage: Math.floor(Math.random() * 100) + 1 },
      { name: "Trabajo Social", percentage: Math.floor(Math.random() * 100) + 1 },
      { name: "Educación Especial", percentage: Math.floor(Math.random() * 100) + 1 },
    ],
    Intrapersonal: [
      { name: "Psicología", percentage: Math.floor(Math.random() * 100) + 1 },
      { name: "Consejería", percentage: Math.floor(Math.random() * 100) + 1 },
      { name: "Coaching", percentage: Math.floor(Math.random() * 100) + 1 },
    ],
    Logic: [
      { name: "Ingeniería", percentage: Math.floor(Math.random() * 100) + 1 },
      { name: "Informática", percentage: Math.floor(Math.random() * 100) + 1 },
      { name: "Matemáticas", percentage: Math.floor(Math.random() * 100) + 1 },
    ],
    Musical: [
      { name: "Música", percentage: Math.floor(Math.random() * 100) + 1 },
      { name: "Producción Musical", percentage: Math.floor(Math.random() * 100) + 1 },
      { name: "Educación Musical", percentage: Math.floor(Math.random() * 100) + 1 },
    ],
    Naturalistic: [
      { name: "Biología", percentage: Math.floor(Math.random() * 100) + 1 },
      { name: "Agronomía", percentage: Math.floor(Math.random() * 100) + 1 },
      { name: "Medicina Veterinaria", percentage: Math.floor(Math.random() * 100) + 1 },
    ],
    Verbal: [
      { name: "Comunicación", percentage: Math.floor(Math.random() * 100) + 1 },
      { name: "Literatura", percentage: Math.floor(Math.random() * 100) + 1 },
      { name: "Periodismo", percentage: Math.floor(Math.random() * 100) + 1 },
    ],
    Visual: [
      { name: "Diseño Gráfico", percentage: Math.floor(Math.random() * 100) + 1 },
      { name: "Arquitectura", percentage: Math.floor(Math.random() * 100) + 1 },
      { name: "Fotografía", percentage: Math.floor(Math.random() * 100) + 1 },
    ],
  };

  careers[preferredCategory].forEach((career) => {
    // Asignar la puntuación correcta de la carrera
    // basada en la puntuación de la categoría preferida
    career.percentage = scores[preferredCategory];
  });

  // Devolver la categoría preferida, las puntuaciones y las carreras
  return { preferredCategory, scores, careers };
},
};