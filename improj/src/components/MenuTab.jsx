import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import supabase from '../Supabase/Supabase';
import { useNavigate } from 'react-router-dom';

export default function MenuTab({ menu, setMenu, user, checkUser }) {
    
    const [isSlidingOut, setIsSlidingOut] = useState(false);
    const navigate = useNavigate();
    
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
        <div className={`Menu ${isSlidingOut ? 'MenuTab-slide-out' : 'MenuTab-slide-in'}`}> {/**Passes Class for animation*/}
            {checkUser ? (
                <>
                <div className="Menu-bar">
                    <div className="Account" onClick={handleCloseMenu}>
                        <img
                        src={user.profile}
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
                    <Link to="/message" className='span'><span className='span' onClick={handleCloseMenu}>Messages</span></Link>
                    <Link to="/viewOrders" className='span'><span className='span' onClick={handleCloseMenu}>View Orders</span></Link>
                    <Link to="/MyEbooks" className='span'><span className='span' onClick={handleCloseMenu}>E - Books</span></Link>
                    {user.type === 'admin' && <Link to='/AdminPanel' className='span'><span className="span" onClick={handleCloseMenu}>Admin</span></Link>}
                    <hr style={{ marginTop: '35px' }} />
                    <button onClick={()=> LogOut()}>Log Out</button>
                </div>
                </>
            ):(
                <button>Login</button>
            )}
        </div>
    </>
  );
}