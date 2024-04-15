import { Box, Toolbar } from '@mui/material'
import React from 'react'
import { NavBar, SideBar } from '../components';


const drawerWidth = 240;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{display: 'flex'}}>

        
        {/* NavBar drawerWidth */}
        <NavBar />

        {/* SideBar drawerWidth */}

        {/* <SideBar drawerWidth={ drawerWidth }/> */}

        <Box
         component={'main'}
         sx={{ flexGrow: 5, p: 5}}
         >

            <Toolbar />

            { children }

        </Box>
        
        
    </Box>
  )
}
