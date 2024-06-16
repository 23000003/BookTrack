import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function MenuTab({ menu, setMenu, user, checkUser }) {
    
    const [isSlidingOut, setIsSlidingOut] = useState(false);

    const handleCloseMenu = () => {
        setIsSlidingOut(true);
        setTimeout(() => {
        setMenu(false);
        setIsSlidingOut(false);
        }, 300);
    };

    return (
    <>
        <div className="Menu-Account" onClick={handleCloseMenu}></div>
        <div className={`Menu ${isSlidingOut ? 'MenuTab-slide-out' : 'MenuTab-slide-in'}`}> {/**Passes Class for animation*/}
            {checkUser ? (
                <>
                <div className="Menu-bar">
                    <div className="Account" onClick={handleCloseMenu}>
                        <img
                        src="https://wfiljmekszmbpzaqaxys.supabase.co/storage/v1/object/public/images/pfp.jpg?t=2024-05-29T05%3A50%3A57.482Z"
                        alt="profile_pic"
                        style={{ borderRadius: '2em', width: '35px', marginRight: '5px' }}
                        />
                        <span className="name">{user.account_name}</span>
                        <i className="fas fa-chevron-down"></i>
                    </div>
                    <hr />
                </div>
                <div className="menus-choice">
                    <Link to="/myprofile" className='span'><span className='span' onClick={handleCloseMenu}>My Account</span></Link>
                    <Link to="" className='span'><span className='span' onClick={handleCloseMenu}>Messages</span></Link>
                    <Link to="" className='span'><span className='span'>E - Books</span></Link>
                    <hr style={{ marginTop: '35px' }} />
                    <button>Log Out</button>
                </div>
                </>
            ):(
                <button>Login</button>
            )}
        </div>
    </>
  );
}