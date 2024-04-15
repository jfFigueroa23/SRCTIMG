import { Route, Routes } from "react-router-dom"
import { AuthRoutes } from "../auth/routes/AuthRoutes"
import { JournalRautes } from "../journal/routes/JournalRautes"


export const AppRouter = () => {
  return (
    <Routes>
        {/* Login y registro */}
        <Route path="/auth/*" element={ <AuthRoutes />}/> {/* Cualquier carpeta que inicie con el /auth/ entonces va mostrar el elemento que es el AuthRoutes */}


        {/* JournalApp */}
        <Route path="/*" element={ <JournalRautes />}/>

    </Routes>
  )
}
