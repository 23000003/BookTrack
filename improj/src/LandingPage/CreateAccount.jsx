import { useState } from "react";
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Background from '../assets/background.jpg'
import '../styles/landing.css'

export default function CreateAccount(){

    const supabase = useSupabaseClient();
    const user = useUser();
    const [email, setEmail] = useState("");
    const [accountName, setAccountName] = useState("");
    const [password, setPassword] = useState("");
    const [contactNum, setContactNum] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const UserSignUp = async (e) =>{
        e.preventDefault();

        if(password !== confirmPassword){
            alert("Confirm Password & Password Not The Same")
            return;
        }

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });
        console.log(email);
        console.log(password);
        if(error){
            console.log(error)
            alert("Error Creating An account");
        }else{
            alert("Welcome ")
            const {data, error} = await supabase.from('Accounts')
            .insert({
                account_name: accountName,
                email: email,
                contact: contactNum
            });

            await supabase.auth.signOut();

            if(error){
                console.log(error);
                alert("Error inserting to accounts table");
            }
        }
    }

    return(
        <div className="login-container">
            <img src={Background} alt="shelf"/>
            <div className="login-box">
            
            <form onSubmit={(e) => UserSignUp(e)}>
                <h1>Create An Account</h1>

                <div className="login-input-box">
                    <p>Display Name</p>
                    <input type="text" onChange={(e) => setAccountName(e.target.value)}/>
                    <i className='bx bxs-user' ></i>
                </div>

                <div className="login-input-box">
                    <p>Email</p>
                    <input type="email" onChange={(e) => setEmail(e.target.value)}/>
                    <i className='bx bx-current-location' ></i>
                </div>

                <div className="login-input-box">
                    <p>Password</p>
                    <input type="password" onChange={(e) => setPassword(e.target.value)}/>
                    <i className='bx bxs-lock-alt' ></i>
                </div>

                <div className="login-input-box">
                    <p>Confirm Password</p>
                    <input type="password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                    <i className='bx bxs-lock-alt' ></i>
                </div>

                <div className="login-input-box">
                    <p>Contact Number</p>
                    <input type="text" onChange={(e) => setContactNum(e.target.value)}/>
                    <i className='bx bxs-user' ></i>
                </div>
                
                
                <button type="submit" className="login-button">Create</button>
                <div className="register">
                    <p>Don't have an account?<a href="#"> Sign up.</a></p>
                </div>
            </form>
            
            </div>
        </div>    
    );
}
