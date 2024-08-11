import {auth , provider} from '../../config/firebase-config';
import {signInWithPopup , signInWithEmailAndPassword , updateProfile , createUserWithEmailAndPassword} from 'firebase/auth'
import { useEffect , useState } from 'react';
import {useNavigate , Navigate} from 'react-router-dom';

import GoogleButton from 'react-google-button'

import { useGetUserInfo } from '../../hooks/useGetUserInfo';

import './auth.css';


export const Auth = ()=>{

    const navigate= useNavigate() // use to redirect after login

    const {isAuth} = useGetUserInfo();
    
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");


    const [registerEmail,setRegisterEmail] = useState("");
    const [registerPassword,setRegisterPassword] = useState("");
    const [name,setName] = useState("");

    const [firstTimeSignUp, setFirstTimeSignUp] = useState(false);

    const handleRegistration = async ()=>{
        try{
            const results = await createUserWithEmailAndPassword(auth,registerEmail,registerPassword);
            console.log(results);
            await updateProfile(results.user, {
                displayName: name,
                photoURL: "",
              });
        
              const authInfo = {
                userID: results.user.uid,
                name: name,
                profilePhoto: results.user.photoURL,
                isAuth: true,
              };
              localStorage.setItem('auth', JSON.stringify(authInfo));


            
            navigate('/expense-tracker'); // Redirect to your desired page after login
        }catch(err){
            console.error(err);
        }
            
    }

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
          const results = await signInWithEmailAndPassword(auth, email, password);
          
    
          navigate('/expense-tracker'); // Redirect to your desired page after login
        } catch (err) {
          
          console.error('Error signing in or updating profile:', err);
        }
      };

    // capturing email and password input




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

// if user has already logged in , only runs at the initial rendering       


useEffect(()=>{
    if(isAuth){
        navigate("/expense-tracker")
    }
},[]);

// handle signUp/login

const handleSignUp = ()=>{

    setFirstTimeSignUp((prevFirstTime)=>{
        return !prevFirstTime;
    });
}

    return (
        <>

        
        
            {
                firstTimeSignUp === true ? (<div className='register-user'>

                    <button onClick={handleSignUp} className='existing-user'>Existing User</button>
                    
                    <h3 className='signUp-text'>Sign Up to track your Expense</h3>
                    
            
                    <div className='register-user_name'>
                        
                        <label htmlFor="name">Name:</label>
                        <input type="text" name='name' onChange={(e)=>{
                            setName(e.target.value);
                            }} value={name}/>
                    

                    
                        <label htmlFor="email">Email:</label>
                        <input type="email" name='email' onChange={(e)=>{
                            setRegisterEmail(e.target.value)
                        }} />

                        <label htmlFor="password">Password:</label>
                        <input type="password" name='password' onChange={(e)=>{
                            setRegisterPassword(e.target.value)
                        }} />

                        
                        
                    </div>

            <button onClick={handleRegistration} className='signUp-btn'>Sign Up</button>
            
                </div>) :
                
                <></>
            }
            
            

            
            {
                firstTimeSignUp === true ? (
                    <></>
                ) :
                (<div className='login'>

                    
                    
                    <div className="login-page">
                        
                    <button className='first-time-user' onClick={handleSignUp}>First Time User </button>
                    
                    <div className='sign-in-text'>
                        <h3 >Welcome Back!</h3>
                     
                     </div>

                        <div className='email-login'>
                            <h4>Sign In</h4>

                            <div className='email-input'>
                                <label htmlFor="email">Email</label>
                                <input type="email" name='email' onChange={(e)=>{
                                    setEmail(e.target.value)
                                }} value={email}/>
                            </div>
                            
                            <div className='password-input'>
                                <label htmlFor="password">Password</label>
                                <input type="password" name='password' onChange={(e)=>{
                                    setPassword(e.target.value)
                                }} value={password} />
                            </div>
                            

                            <button onClick={handleSignIn}>Login</button>
                        </div>

                        <p> OR </p>

                        <div className='google-signIn'>
                            <p>Sign in with Google to continue</p>
                            
                            <GoogleButton
                                onClick={SignInWithGoogle}
                            />
                        </div>  
            
                    </div>

                    <div className='login-pic'>
                        <img src="../../public/expense-categories.webp" alt="" />
                    </div>
                </div>
                )
            }
        

        
        </>
    )
}