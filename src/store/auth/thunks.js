import { loginWithEmailPassword, logoutFirebase, registerUserWithUserPassword, signInWithGoogle } from "../../firebase/providers";
import { chekingCredentials, login, logout } from "./authSlice";

export const checkingAuthentication = (email, password) => {
    return async( dispatch ) => {

        dispatch(chekingCredentials() );

    }

}

export const startGoogleSignIn = ()=> {
    return async(dispatch ) => {

        dispatch(chekingCredentials() );
        const result = await signInWithGoogle();
        if (!result.ok ) return dispatch( logout(result.errorMessage ) );

        dispatch( login( result ) )

    }

}

export const startCreatingUserWithEmailPassword = ({ email, password, displayName}) => {
    return async( dispatch ) => {
        dispatch(chekingCredentials() );

        const {ok, uid, photoURL, errorMessage} = await registerUserWithUserPassword({ email, password, displayName });

        if( !ok ) return dispatch( logout({ errorMessage }) );

        dispatch( login({ uid, displayName, email, photoURL }));


    }

}

export const startLoginWithEmailPassword = ({ email, password }) => {
    return async( dispatch ) => {
        dispatch(chekingCredentials() );

        const result = await loginWithEmailPassword({ email, password });

        if( !result.ok ) return dispatch( logout( result ));

        dispatch( login( result ));
    }


}

export const startLogout = () => {
    return async( dispatch ) => {

        await logoutFirebase();
        dispatch( logout({}) );

    }

}

export const startLogin = (email, password) => {
    return async (dispatch) => {
        try {
            // Llama a la función de inicio de sesión desde el servicio de autenticación
            await loginFirebase(email, password);
            // Despacha la acción para actualizar el estado de autenticación
            dispatch(login({ email })); // Aquí puedes pasar más información del usuario si lo necesitas
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            // Manejo de errores, como mostrar un mensaje al usuario
        }
    };
};