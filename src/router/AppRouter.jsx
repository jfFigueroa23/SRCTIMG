import React from 'react'
import { useSelector } from "react-redux"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRautes } from "../journal/routes/JournalRautes"
import { Navigate, Route, Routes } from 'react-router-dom';
import {CheckingAuth } from '../ui/index'

export const AppRouter = () => {


  const {status} = useSelector(state => state.auth);



  if ( status === 'checking' ) {
    return <CheckingAuth />
  }

  return (
    <Routes>

      {
        (status === 'Autenticado') //Si yo estoy autenticado solo estas rutas van a existir
        ? <Route path="/*" element={ <JournalRautes />}/>
        : <Route path="/auth/*" element={ <AuthRoutes />}/> 
        
      }

      <Route path='/*' element={<Navigate to='/auth/login'/>} />



        {/* Login y registro
        <Route path="/auth/*" element={ <AuthRoutes />}/> {/* Cualquier carpeta que inicie con el /auth/ entonces va mostrar el elemento que es el AuthRoutes */}


        {/* JournalApp */}
        {/* // <Route path="/*" element={ <JournalRautes />}/> */} 

    </Routes>
  )
}
