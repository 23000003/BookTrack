import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../Supabase/Supabase';
import { useNavigate } from 'react-router-dom';
import FavouriteTab from './FavouritesTab';

export default function MenuTab({ menu, setMenu, user, checkUser }) {
    
    const [isSlidingOut, setIsSlidingOut] = useState(false);
    const [favouriteTrigger, setFavouriteTrigger] = useState(false);
    const navigate = useNavigate();
    const favouriteRef = useRef(null);

    const FavouriteFunc = () =>{
        setFavouriteTrigger(true);
    }

    const handleCloseMenu = () => {
        setIsSlidingOut(true);
        setTimeout(() => {
        setMenu(false);
        setIsSlidingOut(false);
        }, 300);
    };

    const LogOut = async () =>{
        const {error} = await supabase.auth.signOut();
        if(error){
            alert("error Logging out");
        }
        navigate('/');
    }

    return (
        <>
            <div className="Menu-Account" onClick={handleCloseMenu}></div>
            <div 
                className={`Menu ${isSlidingOut ? 'MenuTab-slide-out' : 'MenuTab-slide-in'} ${favouriteTrigger ? 'Menu-expanded' : ''}`} 
                ref={favouriteRef}
            >
                {checkUser ? (
                    favouriteTrigger ? (
                        <FavouriteTab handleCloseMenu={handleCloseMenu} user={user}/>
                    ) : (
                    <>
                        <div className="Menu-bar">
                            <div className="Account" onClick={handleCloseMenu}>
                                <img
                                    src={user.profile}
                                    alt="profile_pic"
                                    style={{ borderRadius: '2em', width: '35px', marginRight: '5px' }}
                                />
                                <span className="name">{user.account_name}</span>
                            </div>
                            <hr />
                        </div>
                        <div className="menus-choice">
                            <Link to="/myprofile" className='span'><span className='span' onClick={handleCloseMenu}>My Account</span></Link>
                            <Link to="/message" className='span'><span className='span' onClick={handleCloseMenu}>Messages</span></Link>
                            <span className='span' onClick={() => { handleCloseMenu(); navigate('/viewOrders', {state: {user}})}}>View Orders</span>
                            <span className='span' onClick={() => { handleCloseMenu(); navigate('/MyEbooks', {state: {user}})}}>E - Books</span>
                            <span className='span' onClick={() => {FavouriteFunc()}}>Favourites</span>
                            {user.type === 'admin' && <Link to='/AdminPanel/ViewAccounts' className='span'><span className="span" onClick={handleCloseMenu}>Admin</span></Link>}
                            <hr style={{ marginTop: '35px' }} />
                            <button onClick={()=> LogOut()} className='logout-menu'>Log Out</button>
                        </div>
                    </>
                    )
                ) : (
                    <button>Login</button>
                )}
            </div>
        </>
    );    
}