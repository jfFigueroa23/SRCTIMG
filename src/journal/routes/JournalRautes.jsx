import { Navigate, Route, Routes } from "react-router-dom"
import { JournalPage } from "../pages/JournalPage"
import { TestPage } from "../pages/TestPage"
import { TestPageDos } from "../pages/TestPageDos"
import { TestFinalPage } from "../pages/TestFinalPage"
import { TestUserPage} from "../pages/TestUserPage"
import { TestPageTres } from "../pages/TestPageTres"


export const JournalRautes = () => {
  return (
    <Routes>
        <Route path="/inicio" element={ <JournalPage />}/>
        <Route path="/test" element={ <TestPage />}/>
        <Route path="/testdos" element={ <TestPageDos />} />
        <Route path="/testtres" element={ <TestPageTres />} />
        <Route path="/testfinal" element={ <TestFinalPage/>} />
        <Route path="/testuser" element={ <TestUserPage/>} />
        <Route path="/*" element={ <Navigate to="/inicio"/>}/>
    </Routes>
  )
}
