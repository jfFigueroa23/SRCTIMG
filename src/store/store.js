import { configureStore } from '@reduxjs/toolkit'
/* import { authSlice } from './auth'
 */
import { ApiSlice } from './AutenApi/ApiSlice'
import { respuestasSlice } from './respuestasSlice/respuestasSlice'

export const store = configureStore({
    reducer: {
        auth: ApiSlice.reducer,
        respuestas: respuestasSlice.reducer
    },
})

