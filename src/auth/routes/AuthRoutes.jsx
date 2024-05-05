import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { ContrasenaPage, LoginPage, RegisterPage } from '../pages';

export const AuthRoutes = () => {
  return (
    <Routes>
        <Route path='login' element={ <LoginPage />}/>
        <Route path='register' element={ <RegisterPage />}/>
        <Route path='contrasena' element={ <ContrasenaPage />}/>

        <Route path='/*' element={ <Navigate to="/auth/login" /> } />
    </Routes>
  )
}
