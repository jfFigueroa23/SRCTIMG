import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'Checking', //cheking, No autenticado y si autenticado
        uid: null,
        email: null,
        displayName: null,
        photoURL: null,
        errorMessage: null,
    },
    reducers: {
        login: ( state, {payload} ) => {
            state.status = 'Autenticado';
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.displayName;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;


        },
        logout: (state, {payload} ) => {
            state.status = 'No autenticado';
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload?.errorMessage;
            
        },
        chekingCredentials: (state) => {
            state.status = 'checking';

        }
    }
});

export const { login,logout,chekingCredentials } = authSlice.actions;