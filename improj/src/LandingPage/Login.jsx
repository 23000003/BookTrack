import Background from '../assets/background.jpg'
import '../styles/landing.css'
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import UserHook from './UserHookData.jsx';

export default function LoginPage(){

    const {user, checkUser} = UserHook();
    const supabase = useSupabaseClient();
    const [email, setEmail] = useState("");
    const [accountName, setAccountName] = useState("");
    const [password, setPassword] = useState("");

    const LoginUser = async (e) => {
        e.preventDefault(); 
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          });
      
            if (error) {
                console.error("Login error:", error.message);
                alert("Cannot find account or incorrect password.");
            } else {
                alert("Welcome!");
            }
        } 
        catch (error) {
            console.error("Login error:", error.message);
            alert("An unexpected error occurred. Please try again.");
        }
    }

    const SignOutUser = async () =>{
        const {error} = await supabase.auth.signOut();
        if(error){
            alert("error Logging out");
        }
    }

    return(
        <div className="login-container">
            <img src={Background} alt="shelf"/>
            <div className="login-box">
            
            <form onSubmit={(e) => LoginUser(e)}>
                <h1>Login</h1>
                <div className="login-input-box">
                    <p>Username</p>
                    <input type="text" onChange={(e) => setAccountName(e.target.value)}/>
                    <i className='bx bxs-user' ></i>
                </div>
                <div className="login-input-box">
                    <p>Password</p>
                    <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                    <i className='bx bxs-lock-alt' ></i>
                </div>
                <div className="login-input-box">
                    <p>Email</p>
                    <input type="email" onChange={(e) => setEmail(e.target.value)}/>
                    <i className='bx bx-current-location' ></i>
                </div>
                <div className="login-checkbox">
                    <label><input type="checkbox"/>Remember me</label>
                    <a href="#">Forgot Password?</a>
                </div>
                <button type="submit" className="login-button">Login</button>
                <div className="register">
                    <p>Don't have an account?<Link to="/CreateAccount"> Sign up.</Link></p>
                </div>
            </form>

                {checkUser === null ? (
                    <h2>Login</h2>
                )
                :
                (   
                    <>
                    <h2>Welcome {user.email}</h2>
                    <button onClick={() => SignOutUser()}>Signout</button>
                    </>
                )}
            </div>
        </div>    
    );
}