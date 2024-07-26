import {auth , provider} from '../../config/firebase-config';
import {signInWithPopup} from 'firebase/auth'
import {useNavigate} from 'react-router-dom';


export const Auth = ()=>{

    const navigate= useNavigate() // use to redirect after login

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