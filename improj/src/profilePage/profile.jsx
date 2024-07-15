import { useState } from "react";
import profileData from './profileDataHook'
import './profile.css'
import UserHook from "../Supabase/UserSessionData";
import BookSoldTab from "./BookSoldTab.jsx";
import BookHistory from "./BookHistoryTab.jsx"
import BookTransact from "./BookTransacTab.jsx"
import BookSellTab from "./BookSellTab.jsx";
import useNodeMailerHook from "../NodemailerHook.jsx";

export default function Profile(){

    const [userTab, setUserTab] = useState('Books_Sell');
    const [ItemTrigger, setItemTrigger] = useState(false);
    const [transacTrigger, setTransacTrigger] = useState(false);
    const [data, setData] = useState([]);
    const {sendEmail} = useNodeMailerHook()
    const {user, _, userloading} = UserHook();
    
    console.log(userTab)

    const ViewItem = (data) =>{
        setItemTrigger(true);
        setData(data);
        document.body.style.overflow = "hidden";
        console.log(data);
    }

    const ExitViewItem = () =>{
        setItemTrigger(false);
        document.body.style.overflow = "auto";
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
                            <p>|</p>
                            <a href="https://www.facebook.com/kentward.maratas.7" target="_blank">
                                <img src="https://freepnglogo.com/images/all_img/1713419166FB_Logo_PNG.png" alt="" style={{marginTop: "5px"}}/>
                            </a>
                        </div>
                    </div>
                    )}
                </div>
                
                <div className="User-Account">
                    <div className="choices">
                        <span onClick={() => setUserTab('Books_Sell')}>Items On Sale</span> 
                        <span id="totalitems"></span> 
                        <span style={{marginLeft: "45px"}} onClick={() => setUserTab('Books_Sold')}>Items Sold</span> 
                        <span style={{marginLeft: "50px"}} onClick={() => setUserTab('History')}>History</span>
                        <span style={{marginLeft: "50px"}}>|</span>
                        <span id="process-notif">1</span> 
                        <span style={{marginLeft: "40px"}} onClick={() => setUserTab('transaction')}>Transaction</span> 
                    </div>
                    <hr className="Hr"/>

                    {userTab === 'Books_Sell' && (
                        <BookSellTab />
                    )}
                    
                    {userTab === 'Books_Sold' && (
                        <BookSoldTab />
                    )}
                    
                    {userTab === 'History' && (
                        <BookHistory/>
                    )}
                    
                    {userTab === 'transaction' && (
                        <BookTransact/>
                    )}
                    
                </div>
            </div>
            <div style={{marginBottom: "150px"}}></div>
            <button id="PostBox" onClick={() => sendEmail("23102438@usc.edu.ph", "Suck my Big ASs Dick", "FUck youn nigga")}>POST ITEM</button>
        </>
    );
}