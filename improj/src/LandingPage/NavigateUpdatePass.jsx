import { useState } from 'react';
import Background from '../assets/background.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';

export default function UpdateForgotPassword(){

    const [current, setCurrent] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmNewPass, setConfirm] = useState('');
    const supabase = useSupabaseClient();
    const navigate = useNavigate();

    const UpdatePass = async (e) =>{
        console.log("HEY")
        e.preventDefault();

        if(newPass === confirmNewPass){
            const { user, error } = await supabase.auth.updateUser({
                password: newPass
            })
            console.log(user)
            if(error){
                console.log(error)
            }else{
                alert("Change Password Successful")
                navigate('/');
            }
        }else{
            alert("Passwords Do not Match!")
        }
        
    }


    return( 
        <div className="login-container">
            <img src={Background} alt="shelf"/>
            <div className="login-box">
            
            <form>
                <h1>Change Password</h1>
                
                <div className="login-input-box">
                    <p>New Password</p>
                    <input type="password" onChange={(e) => setNewPass(e.target.value)}/>
                    <i className='bx bxs-user' ></i>
                </div>

                <div className="login-input-box">
                    <p>Confirm New Password</p>
                    <input type="password" onChange={(e) => setConfirm(e.target.value)}/>
                    <i className='bx bxs-user' ></i>
                </div>
                
                <button onClick={UpdatePass} className="login-button" style={{marginTop: "20px"}}>Change Password</button>
                <div className="register">
                </div>
            </form>
            </div>
        </div>    
    );
}