import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import MenuTab from './MenuTab';
import UserHook from '../LandingPage/UserSessionData';
import pfp from '../assets/nopfp.png'

export default function Navbar() {
    const [menu, setMenu] = useState(false);
    const [showNotif, setNotif] = useState(false);
    const [booksTab, setBooksTab] = useState(true); // true if browse by books false if ebooks
    const [browse, setBrowse] = useState(false);
    const {user, checkUser} = UserHook();
    
    const guest = checkUser ? user.profile : pfp;
    const navigate = useNavigate();

    console.log(user.profile);
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
                    <div>
                        <span>Home</span>
                    </div>
                    <div className='Browse1' onClick={() => setBrowse(!browse)}>
                        <span>{booksTab ? "Browse by Books" : "Browse By E-Books"}</span>
                    </div>
                </div>
                <div className="navbar_right">
                    <div className="profile">
                        <div className="icon_wrap">
                            {/* <FontAwesomeIcon icon="fas fa-shopping-cart" />
                            <span>Cart</span> */}
                            <button type="button" className="icon-button" onClick={() => setNotif(!showNotif)}>
                                <span className="material-icons">notifications</span>
                                <span className="icon-button__badge">1</span>
                            </button>
                            <div onClick={() => setMenu(!menu)} className="profile-link">
                                <img
                                    src={guest}
                                    alt="profile_pic"
                                    style={{ borderRadius: '2em' }}
                                />
                                <span className="name">{checkUser ? user.account_name : 'Guest'}</span>
                                <i className="fas fa-chevron-down"></i>
                            </div>
                        </div>

                        {browse && booksTab && (
                            <div className='Browse'>
                                <span onClick={() => 
                                    {navigate('/e-books'), 
                                    setBooksTab(false), 
                                    setBrowse(!browse)}
                                }>
                                Browse by E-Books
                                </span>
                            </div>
                        )}
                        
                        {browse && !booksTab && (
                            <div className='Browse'>
                                <span onClick={() => 
                                    {navigate('/books') ,
                                    setBooksTab(true), 
                                    setBrowse(!browse)}} 
                                    style={{paddingRight: "17px"}
                                }>
                                Browse by Books
                                </span>
                            </div>
                        )}

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

