import { useEffect, useMemo, useState } from 'react';

export const useForm = ( initialForm = {}, formValidations = {} ) => {
  
    const [ formState, setFormState ] = useState( initialForm );
    const [formvalidations, setFormValidations] = useState({});

    useEffect(() => {
        createValidators();
    }, [ formState ])

    useEffect(() => {
      setFormState( initialForm );
    }, [initialForm])
    

    const isFormValid = useMemo(() => {

        for (const formValue of Object.keys( formvalidations )) {
            if( formvalidations[formValue] !== null ) return false;
        }

        return true;
    }, [ formvalidations ])
    


    
    

    const onInputChange = ({ target }) => {
        const { name, value } = target;
        setFormState({
            ...formState,
            [ name ]: value
        });
    }

    const onResetForm = () => {
        setFormState( initialForm );
    }

    const createValidators = () => {

        const formCheckedValues = {};

        for (const formField of Object.keys( formValidations )) {
            const [ fn, errorMessage ] = formValidations[formField];

            formCheckedValues[`${ formField }Valid`] =fn( formState[formField] ) ? null : errorMessage;
            
        }

        setFormValidations( formCheckedValues );



    }

    

    return {
        ...formState,
        formState,
        onInputChange,
        onResetForm,

        ...formvalidations,
        isFormValid
    }
}