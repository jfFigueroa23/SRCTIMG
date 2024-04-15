import { Navigate, Route, Routes } from "react-router-dom"
import { JournalPage } from "../pages/JournalPage"
import { TestPage } from "../pages/TestPage"
// import { PrincipalPage } from "../pages/PrincipalPage"


export const JournalRautes = () => {
  return (
    <Routes>
        <Route path="/inicio" element={ <JournalPage />}/>
        <Route path="/test" element={ <TestPage />}/>

        <Route path="/*" element={ <Navigate to="/inicio"/>}/>
    </Routes>
  )
}
