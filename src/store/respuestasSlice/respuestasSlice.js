import { createSlice } from '@reduxjs/toolkit';

export const respuestasSlice = createSlice({
    name: 'respuestas',
    initialState: {

        pageuno: [],
        pagedos: {},
        pagetres: {}

    },
    reducers: {

        addnewpageuno: (state, {payload}) => {

            state.pageuno.push(payload)
            
        },

        addnewpagedos: (state, {payload}) => {

            state.pagedos.push(payload)
            
        },

        addnewpagetres: (state, {payload}) => {

            state.pagetres.push(payload)
            
        }
    
    }
});


// Action creators are generated for each case reducer function
export const { addnewpageuno, addnewpagedos, addnewpagetres } = respuestasSlice.actions;