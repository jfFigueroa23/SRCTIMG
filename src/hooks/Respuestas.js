import React from 'react'
import { useDispatch } from 'react-redux'

export const Respuestas = () => {

    const dispatch = useDispatch()

    const guardarRespuesta = (dates) => {
        
        console.log(dates)

    }

    return{

        guardarRespuesta

    }

}

