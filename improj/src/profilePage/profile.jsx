import { useState } from "react";
import profileData from './profileDataHook'
import './profile.css'
import UserHook from "../Supabase/UserSessionData";
import useNodeMailerHook from "../NodemailerHook.jsx";
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useNavigate, Outlet } from 'react-router-dom';
import {v4 as uuidv4} from 'uuid';

export default function Profile(){

    const {user, _, userloading} = UserHook();
    const navigate = useNavigate();
    const supabase = useSupabaseClient();
    console.log("PROFILE TAB",user)

    const [ItemTrigger, setItemTrigger] = useState(false);

    const ExitViewItem = () =>{
        setItemTrigger(!ItemTrigger);
        document.body.style.overflow = ItemTrigger ? "hidden" : "auto";
    }
    const UpdatePass = async (e) =>{
        console.log("HEY")
        e.preventDefault();
        const { user, error } = await supabase.auth.updateUser({password: '123000'})
        console.log(user)
        if(error){
            console.log(error)
        }else{
            console.log(user)
        }
    }


    const [newProfile, setNewProfile] = useState('');
    const [newDisplayName, setNewDisplay] = useState('');
    const [image, setImage] = useState(null);
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setNewProfile(reader.result);
          };
          reader.readAsDataURL(file);
        }
    };
    
    const ManageProfile = async() =>{
        const uuid = uuidv4();
        const unique = `https://wfiljmekszmbpzaqaxys.supabase.co/storage/v1/object/public/images/${uuid}`

        if(image === null && newDisplayName === ''){
            alert("You cant update")
            return;
        }
        const {error} = await supabase.from('Accounts')
        .update({
            profile: image === null ? user.profile : unique,
            account_name: newDisplayName === '' ? user.account_name : newDisplayName
        }).eq('account_id', user.account_id)
        
        if(error){
            console.log(error)
        }else{
            const { data, error:UploadProfile } = await supabase.storage
            .from('images')
            .upload(uuid, image);

            if(UploadProfile){
                console.log(UploadProfile)
            }else{
                alert("Update Successful")
                window.location.reload()
            }
        }
    }

    return(
        <>
            <div className="container">
                <div className="background">
                    {userloading ? (
                    <div className="Pfp">
                        <div className='loader'></div>
                    </div>
                    ):(
                    <div className="Pfp">
                        <img className="pfpimg" src={user.profile}/>
                        <div className="username user-label">
                            <p>{user.account_name}</p>
                            <button onClick={() => ExitViewItem()}>Edit Profile</button>
                        </div>
                    </div>
                    )}
                </div>
                
                <div className="User-Account">
                    <div className="choices">
                        <span onClick={() => navigate('/myprofile/SellTab', {state: {user}})}>Items On Sale</span> 
                        <span style={{marginLeft: "45px"}} onClick={() => navigate('/myprofile/SoldTab', {state: {user}})}>Items Sold</span> 
                        <span style={{marginLeft: "50px"}} onClick={() => navigate('/myprofile/HistoryTab', {state: {user}})}>History</span>
                        <span style={{marginLeft: "50px"}}>|</span>
                        <span style={{marginLeft: "40px"}} onClick={() => navigate('/myprofile/TransactionTab', {state: {user}})}>Transaction</span> 
                    </div>
                    <hr className="Hr"/>

                    <Outlet/>
                    
                </div>
            </div>

            {ItemTrigger && (
                <>
                <div className="exposure" onClick={() => ExitViewItem()}></div>
                <div className="user-edit-container">
                    <div className="padd-user">
                        <div className="profile-edit-details s">
                            <h3>My Profile</h3>
                            <hr style={{width: "150px"}}/>
                            <span style={{marginTop: "15px"}}>Profile Image</span>
                            
                            <img src={newProfile || user.profile} alt="Profile" style={{ width: '150px', height: '150px', borderRadius: '1em' }} />                        
                            <input 
                                type="file" 
                                id="file-input" 
                                onChange={handleImageChange} 
                                style={{ display: 'none' }} 
                                />
                            <button 
                                className="upload-button" 
                                onClick={() => document.getElementById('file-input').click()}
                            >
                                Edit Image
                            </button>
                            
                            <div className="display-name">
                                <p>Display Name</p>
                                <input type="text" 
                                    placeholder={user.account_name}
                                    onChange={(e) => setNewDisplay(e.target.value)}
                                />
                            </div>

                            <button className="user-button-choices" onClick={() => navigate('/ChangePass/update')}>Reset Password?</button>
                            <button className="user-button-choices" onClick={ManageProfile}>Save</button>
                        </div>
                    </div>
                </div>
                </>
            )}

            <div style={{marginBottom: "150px"}}></div>
        </>
    );
}