/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { createContext } from 'react';
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { auth } from '../config/firebase.config';

export const AuthContext = createContext(null);

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({})
    const [loading, setLoading] = useState(true)


    //google login
    const googleLogin = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider);
    }

    //github login
    const githubLogin = () => {
      setLoading(true)
      return signInWithPopup(auth, githubProvider);
    }

    // create user/ sign up 
    const createUser = (email, password) => {
      setLoading(true)
      return createUserWithEmailAndPassword(auth, email, password);
    }

    // signin user
    const signin = (email, password) => {
      setLoading(true)
      return signInWithEmailAndPassword(auth, email, password);
    }

    // update yser profile
    const handleUpdateProfile = (name, photo) => {
      return updateProfile(auth.currentUser, {
          displayName: name, photoURL: photo
      })
    }


    // to sign out user
      const logOut = () => {
        return signOut(auth)
    }

    // using observer
    // useEffect(() => {
    //   onAuthStateChanged(auth, (user) => {
    //       setUser(user);
    //       setLoading(false)
    //   });
    // }, [])

    // using observer
    // recommended way
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (user) => {
          setUser(user)
          setLoading(false)
       });
        return () => {
          unSubscribe()
        }
    }, [])


    
    const authentication = {user, googleLogin, githubLogin, createUser, signin, handleUpdateProfile, logOut, loading}

  return (
    <AuthContext.Provider value={authentication}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
