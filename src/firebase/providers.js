import { FirebaseAuth } from "./config";
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, updateProfile, sendPasswordResetEmail } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider); 
        const user = result.user;
        const { displayName, email, photoURL, uid } = result.user;

        return {
            ok: true,
            displayName, email, photoURL, uid
        };
        
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        };
    }
};

export const registerUserWithUserPassword = async ({ email, password, displayName }) => {
    try {
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL } = resp.user;
        
        await updateProfile(FirebaseAuth.currentUser, { displayName });

        return {
            ok: true,
            uid, photoURL, email, displayName
        };
        
    } catch (error) {
        console.log(error);
        return { ok: false, errorMessage: error.message };
    }
};

export const loginWithEmailPassword = async ({ email, password }) => {
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        const { uid, photoURL, displayName } = resp.user;

        return {
            ok: true,
            uid, photoURL, displayName
        };
        
    } catch (error) {
        console.log(error);
        return { ok: false, errorMessage: error.message };
    }
};

export const logoutFirebase = async () => {
    return await FirebaseAuth.signOut();
};


export const resetPassword = async (email) => {
    try {
        await sendPasswordResetEmail(FirebaseAuth, email);
        return { ok: true };
    } catch (error) {
        console.log(error);
        return { ok: false, errorMessage: error.message };
    }
};

