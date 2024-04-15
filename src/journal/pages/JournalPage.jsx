import { Box, Button, Typography } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView, NothingSelectedView } from "../views"
import { AddOutlined } from "@mui/icons-material"
import { Link } from "react-router-dom"


export const JournalPage = () => {

  


  return (
    <JournalLayout>
      {/* <Typography>Esto nomas es temporal JIJOJSDAJSODJASDJASKSDJAKSDJAKDJAKLDKAENFKJADNKAJDBLAJSNHFKLJSDBNCSJHBEFLWJBDUAISBFDWSLJEFBALHDBFJSAHBF</Typography> */}


      {/* <NothingSelectedView /> */}
      {/* NoteView */}

      {/* <NoteView /> */}

              <Box
                sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '90vh',
                maxWidth: '400px',
                mx: 'auto',
                my: 'auto',
                p: 2,
                }}
            >
                <Typography variant="h4" align="center" gutterBottom>
                Bienvenido al Test de Múltiples Inteligencias
                </Typography>
                <Typography variant="body1" align="center" gutterBottom>
                HOLA JUAN CARLO.
                </Typography>
                <Button
                LinkComponent={ Link }
                to='/test'
                variant="contained"
                sx={{ mt: 2 }}
                >
                Iniciar Test
                
                </Button>

            </Box>


    </JournalLayout>
  )
}
