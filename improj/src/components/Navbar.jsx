import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import MenuTab from './MenuTab';
import UserHook from '../LandingPage/UserHookData';

export default function Navbar() {
    const [menu, setMenu] = useState(false);
    const [showNotif, setNotif] = useState(false);
    const {user, checkUser} = UserHook();

    console.log(user);

    useEffect(() =>{
        document.body.style.overflow = menu ? 'hidden' : 'auto';
    }, [menu]);

    return (
    <>
        <div className="wrapper">
            <div className="navbar">
                <div className="navbar_left">
                    <div className="logo">
                        <Link to="/">
                            <img src="https://wfiljmekszmbpzaqaxys.supabase.co/storage/v1/object/public/images/BookTrack__4_.png?t=2024-05-29T13%3A51%3A43.693Z" alt="" className="Booktrack" />
                        </Link>
                    </div>
                </div>
                <div className="navbar_right">
                    <div className="profile">
                        <div className="icon_wrap">
                            <button type="button" className="icon-button" onClick={() => setNotif(!showNotif)}>
                                <span className="material-icons">notifications</span>
                                <span className="icon-button__badge">1</span>
                            </button>
                            <div onClick={() => setMenu(!menu)} className="profile-link">
                                <img
                                    src="https://wfiljmekszmbpzaqaxys.supabase.co/storage/v1/object/public/images/pfp.jpg?t=2024-05-29T05%3A50%3A57.482Z"
                                    alt="profile_pic"
                                    style={{ borderRadius: '2em' }}
                                />
                                <span className="name">{checkUser ? user.account_name : 'Guest'}</span>
                                <i className="fas fa-chevron-down"></i>
                            </div>
                        </div>
                        {showNotif && (
                            <div className="notif-bar">
                                <div className="notif-texts">
                                    <div className="label-notif">
                                        <p>Notifications</p>
                                        <p id="notif-count">0</p>
                                        <p className="read">Mark as read</p>
                                    </div>
                                    <hr />
                                    <div className="notif-append">
                                        {/** Appends Notif Contents here */}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        {menu && <MenuTab menu={menu} setMenu={setMenu} user={user} checkUser={checkUser}/>}
    </>
    );
};


