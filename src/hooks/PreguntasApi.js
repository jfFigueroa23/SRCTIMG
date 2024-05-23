import React from 'react'
import { useDispatch } from 'react-redux';
import { onLoadPreguntas } from '../store/Test/PreguntasSlice';

import { TestApi } from '../api';

export const PreguntasApi = () => {
    const dispatch = useDispatch();



    const StartTest = async() => {


        try {

            const { data } = await TestApi.get('questions_f/get_all_questions/');
            console.log( {data} )

            
            
        } catch (error) {
            console.log(error);
            console.log( 'Error cargando Preguntas' );
        }

    }
    
return {
    //Metodos
    StartTest
    

}
}
