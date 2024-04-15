import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        //! signInWithPopup

        const result = await signInWithPopup(FirebaseAuth, googleProvider ); 
        const user = result.user;
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            // user info

            displayName, email, photoURL, uid


        }
        
    } catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        return{
            ok: false,
            errorMessage,
            
        }
        
    }

}

export const registerUserWithUserPassword = async({email, password, displayName}) => {

    try {
        //! createUserWithEmailAndPassword
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL} = resp.user
        //TODO actualizar el displayName en firebase: HECHO

        await updateProfile( FirebaseAuth.currentUser, { displayName } );

        return {
            ok: true,
            uid, photoURL, email, displayName
        }
        
    } catch (error) {
        console.log(error)
        return {ok: false, errorMessage: error.message }
        
    }

}

export const loginWithEmailPassword = async({ email, password }) => {
    //! signInWithEmailAndPassword

    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL, displayName } = resp.user

        return {
            ok: true,
            uid, photoURL, displayName
        }
        
    } catch (error) {
        console.log(error);
        return {ok: false, errorMessage: error.message}
        
    }


}


export const logoutFirebase = async() => {
    
    return await FirebaseAuth.signOut();

}