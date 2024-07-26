import {auth , provider} from '../../config/firebase-config';
import {signInWithPopup} from 'firebase/auth'
import { useEffect } from 'react';
import {useNavigate , Navigate} from 'react-router-dom';

import { useGetUserInfo } from '../../hooks/useGetUserInfo';


export const Auth = ()=>{

    const navigate= useNavigate() // use to redirect after login

    const {isAuth} = useGetUserInfo();

const SignInWithGoogle = async ()=>{
    const results = await signInWithPopup(auth,provider);   // results contain everything relatd to the user that signed in
    const authInfo = {
        userID:results.user.uid,
        name:results.user.displayName,
        profilePhoto: results.user.photoURL,
        isAuth: true,
    }
    localStorage.setItem('auth',JSON.stringify(authInfo));
    navigate("/expense-tracker");  // will be redirected to expense-tracker page after login...
}   

// if user has already logged in

useEffect(()=>{
    if(isAuth){
        navigate("/expense-tracker")
    }
},[]);

    return (
        <div className="login-page">
            <p>Sign in with Google to continue</p>
            <button className="login-with-google-btn" onClick={SignInWithGoogle}>
                {""}
                Sign In with Google
            </button>
        </div>
    )
}