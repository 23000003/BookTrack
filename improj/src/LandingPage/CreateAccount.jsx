import { useState } from "react";
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import Background from '../assets/background.jpg'
import '../styles/landing.css'
import { Link, useNavigate } from "react-router-dom";


export default function CreateAccount() {

    const supabase = useSupabaseClient();
    const user = useUser();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [accountName, setAccountName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [contactNo, setContactNo] = useState("");
    const [loading, setLoading] = useState(false);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    const contactRegex = /^099-\d{4}-\d{4}$/;


    const UserSignUp = async (e) => {
        e.preventDefault();

        if (confirmPass === '' || accountName === '' || password === '' || contactNo === '' || email === '') {
            alert("Fill all the input fields");
            return;
        }

        if (!emailRegex.test(email)) {
            alert("Email must be in the format 'example@gmail.com'");
            return;
        }

        if (!contactRegex.test(contactNo)) {
            alert("Contact number must be in the format '099-0999-0999'");
            return;
        }

        if (password !== confirmPass) {
            alert("Passwords do not match");
            return;
        }

        const { data: duplicate } = await supabase.from('Accounts')
            .select('account_name')
            .eq('account_name', accountName);

        if (duplicate && duplicate.length !== 0) {
            alert("Account name already exists");
            return;
        }
        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        });

        if (error) {
            console.log(error);
            alert("Email Already Registered !");
            setLoading(false);
        } else {
            const { data: Account, error: ErrorAccount } = await supabase.from('Accounts')
                .insert({
                    account_name: accountName,
                    email: email,
                    contact: contactNo,
                    profile: 'https://wfiljmekszmbpzaqaxys.supabase.co/storage/v1/object/public/images/nopfp.png?t=2024-07-19T14%3A32%3A36.566Z'
                });

            if (ErrorAccount) {
                console.log(ErrorAccount);
            } else {
                navigate('/')
                alert("Welcome");
            }
            setLoading(false);
        }
    }

    return (
        <div className="login-container">
            <img src={Background} alt="shelf" />
            <div className="login-box">
                <form onSubmit={UserSignUp}>
                    <h1>Create An Account</h1>
                    <div className="login-input-box">
                        <p>Display Name</p>
                        <input type="text" onChange={(e) => setAccountName(e.target.value)} />
                        <i className='bx bxs-user'></i>
                    </div>
                    <div className="login-input-box">
                        <p>Email</p>
                        <input type="email" onChange={(e) => setEmail(e.target.value)} />
                        <i className='bx bx-current-location'></i>
                    </div>
                    <div className="login-input-box">
                        <p>Password</p>
                        <input type="password" onChange={(e) => setPassword(e.target.value)} />
                        <i className='bx bxs-lock-alt'></i>
                    </div>
                    <div className="login-input-box">
                        <p>Confirm Password</p>
                        <input type="password" onChange={(e) => setConfirmPass(e.target.value)} />
                        <i className='bx bxs-lock-alt'></i>
                    </div>
                    <div className="login-input-box">
                        <p>Contact Number</p>
                        <input type="text" placeholder="099-9999-999" onChange={(e) => setContactNo(e.target.value)} maxLength="13"/>
                        <i className='bx bxs-user'></i>
                    </div>
                    <button type="submit" className="login-button">Create</button>
                    <div className="register">
                        <p>Already have an account?<Link to="/login"> Log in.</Link></p>
                    </div>
                </form>
            </div>
            {loading && (
                <>
                <div className='upload-loader'></div>
                <div className='loading center-loader'>
                    <div className='loader'></div>
                </div>
                </>
            )}
        </div>

        
    );
}
