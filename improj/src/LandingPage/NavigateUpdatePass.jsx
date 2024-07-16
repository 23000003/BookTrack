import { useState } from 'react';
import Background from '../assets/background.jpg'
import { Link } from 'react-router-dom';

export default function UpdateForgotPassword(){

    const [email, setEmail] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmNewPass, setConfirm] = useState('');

    const ForgotPass = async() =>{

        const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: 'https://example.com/update-password',
        })


    }

    return( 
        <div className="login-container">
            <img src={Background} alt="shelf"/>
            <div className="login-box">
            
            <form>
                <h1>Forgot Password</h1>
                
                <div className="login-input-box">
                    <p>Email</p>
                    <input type="email" onChange={(e) => setEmail(e.target.value)}/>
                    <i className='bx bx-current-location' ></i>
                </div>
                
                <div className="login-input-box">
                    <p>New Password</p>
                    <input type="text" onChange={(e) => setNewPass(e.target.value)}/>
                    <i className='bx bxs-user' ></i>
                </div>

                <div className="login-input-box">
                    <p>Confirm New Password</p>
                    <input type="text" onChange={(e) => setConfirm(e.target.value)}/>
                    <i className='bx bxs-user' ></i>
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
            </div>
        </div>    
    );
}