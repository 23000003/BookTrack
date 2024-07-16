import { useState } from 'react';
import Background from '../assets/background.jpg'
import { Link } from 'react-router-dom';
import supabase from '../Supabase/Supabase';

export default function ForgotPassword(){

    const [currentPass, setCurrentPass] = useState('');
    const [email, setEmail] = useState('');

    const ForgotPass = async () => {
        if (!email) {
            alert("Please enter your email.");
            return;
        }

        try {
            const { data, error } = await supabase.auth.resetPasswordForEmail(email);
            if (error) {
                console.error(error.message);
                alert("Failed to reset password. Please try again later.");
            } else {
                alert("Password reset email sent successfully!");
            }
        } catch (error) {
            console.error("ForgotPass Error:", error);
            alert("An unexpected error occurred. Please try again later.");
        }
    }

    return( 
        <div className="login-container">
            <img src={Background} alt="shelf"/>
            <div className="login-box">
            
                <h1>Forgot Password</h1>
                
                <div className="login-input-box">
                    <p>Email</p>
                    <input type="email" onChange={(e) => setEmail(e.target.value)}/>
                    <i className='bx bx-current-location' ></i>
                </div>

                <div className="login-checkbox">
                    <label><input type="checkbox"/>Remember me</label>
                    <a href="#">Forgot Password?</a>
                </div>
                
                <button type="submit" className="login-button" onClick={() => ForgotPass()}>Forgot Email</button>
                <div className="register">
                    <p>Don't have an account?<Link to="/CreateAccount"> Sign up.</Link></p>
                </div>
            </div>
        </div>    
    );
}