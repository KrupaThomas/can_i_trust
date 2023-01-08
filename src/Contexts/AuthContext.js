import {createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { doc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";

export const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext);
}

export function AuthProvider({children}){
    const [isLoading, setIsLoading] = useState(true);
    const [currentUser, setCurrentUser] = useState();
    const [userProfile, setUserProfile] = useState();
    const [isLogged, setIsLogged] = useState(false);

    function signupWithEmail(email, password){
        return createUserWithEmailAndPassword(auth, email, password);
    }

    function loginWithEmail(email, password){
        return signInWithEmailAndPassword(auth, email, password);
    }

    function loginWithGoogle(){
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider)
    }

    function logout(){
        return  signOut(auth);
    }

    function isOnline(){
        return navigator.onLine;
    }

    function updateProfile(data){
        return updateDoc(doc(db, 'users', currentUser.uid), data);
    }

    useEffect(() => {
        let unsubscribe1 = () => {};
        const unsubscribe0 =  onAuthStateChanged(auth, (user) => {
            if(user){
                setIsLogged(true);
                setCurrentUser(user);
                unsubscribe1 = onSnapshot(doc(db, 'users', user.uid), (snapShot) => {
                    if(snapShot){
                        var data = snapShot.data();
                        setUserProfile(data);
                        setIsLoading(false);
                    }
                });
            }else{
                setIsLogged(false);
                setIsLoading(false);
            }
        });

        return () => {
            unsubscribe1();
            unsubscribe0();
        };
    }, []);

    const value = {
        currentUser,
        userProfile,
        isLogged,
        isLoading,
        updateProfile,
        isOnline,
        signupWithEmail,
        loginWithEmail,
        loginWithGoogle,
        logout
    }

    return <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
}