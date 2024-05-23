import { createSlice } from '@reduxjs/toolkit';




export const ApiSlice = createSlice({
    name: 'Api',
    initialState: {
        status: 'Checking',
        user: {},
        errormessage: undefined,
        

    },
    reducers: {
        onchecking: (state) => {
            state.status= 'Checking';
            state.user= {}

        },
        onLogin: (state, {payload}) => {
            state.status= 'Autenticado';
            state.user= payload;
            state.errormessage= undefined;
        },
        onLogout: (state, {payload}) => {
            state.status= 'NoAutenticado';
            state.user= {};
            state.errormessage= payload;

        }

    }
});


// Action creators are generated for each case reducer function
export const { onchecking, onLogin, onLogout } = ApiSlice.actions;