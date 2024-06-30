import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';
import MenuTab from './MenuTab';
import UserHook from '../Supabase/UserSessionData';
import pfp from '../assets/nopfp.png'
import FetchNotif from './FetchNotif';
import supabase from '../Supabase/Supabase';

export default function Navbar() {
    const [menu, setMenu] = useState(false);
    const [showNotif, setNotif] = useState(false);
    const [booksTab, setBooksTab] = useState(true); // true if browse by books false if ebooks
    const [browse, setBrowse] = useState(false);
    const [browseBar, setBrowseBar] = useState(false);

    const {user, checkUser, userloading, setUser} = UserHook();
    const location = useLocation();
    const guest = checkUser ? user.profile : pfp;
    const navigate = useNavigate();
    const { notifContent, MarkAsRead, setNotifContent, mapError } = FetchNotif();

    const [extendStyle, setExtendStyle] = useState("0px");

    useEffect(() => {
        setExtendStyle(70 + (70 * user.notification) + "px");
    }, [user]);

    console.log(user.profile);
    console.log(user);
    console.log("Notif", notifContent)
   
    useEffect(() =>{
        document.body.style.overflow = menu ? 'hidden' : 'auto';
    }, [menu]);

    useEffect(() =>{

        if(location.pathname === '/books'){
            setBooksTab(true);
            setBrowseBar(true);
        }else if(location.pathname === '/e-books'){
            setBooksTab(false);
            setBrowseBar(true);
        }else{
            setBrowseBar(false);
        }

    }, [location.pathname])

    useEffect(() => {
        const subscription = supabase
            .channel('Accounts')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'Accounts'
            }, (payload) => {
                console.log(payload);
                setUser(payload.new);
            })
            .subscribe();

        const subscription2 = supabase
            .channel('notification_contents')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'notification_contents'
            }, (payload) => {
                setNotifContent(payload.new)
            })
            .subscribe();
        
        
        return () => {
            subscription.unsubscribe();
            subscription2.unsubscribe();
        };

    }, [setUser, setNotifContent]);

    console.log(mapError)

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
                    {browseBar ? (
                        <div className='Browse1' onClick={() => setBrowse(!browse)}>
                            <span>{booksTab ? "Browse by Books" : "Browse By E-Books"}</span>
                        </div>
                    ):(
                        <div className='Browse1' onClick={ () => navigate('/books')}>
                            <span>Browse</span>
                        </div>
                    )}
                </div>
                <div className="navbar_right">
                    <div className="profile">
                        <div className="icon_wrap">
                            {/* <FontAwesomeIcon icon="fas fa-shopping-cart" />
                            <span>Cart</span> */}
                            <button type="button" className="icon-button" onClick={() => setNotif(!showNotif)}>
                                <span className="material-icons">notifications</span>
                                {user.notification !== 0 && checkUser !== null && (
                                    <span className="icon-button__badge">{user.notification}</span>
                                )}
                            </button>
                            <div onClick={() => setMenu(!menu)} className="profile-link">
                                {userloading ? (
                                    <div className='loader' style={{width: "10px"}}></div>
                                ):(
                                    <>
                                        <img
                                        src={guest}
                                        alt="profile_pic"
                                        style={{ borderRadius: '2em' }}
                                        />
                                        <span className="name">{checkUser ? user.account_name: 'Guest'}</span>
                                        <i className="fas fa-chevron-down"></i>
                                    </>
                                )}
                                
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

                        {showNotif && checkUser && (
                            <div className="notif-bar" style={{height: extendStyle}}>
                                <div className="notif-texts">
                                    <div className="label-notif">
                                        <p>Notifications</p>
                                        <p id="notif-count">{user.notification === 0 ? '' : user.notification}</p>
                                        <p className="read" onClick={() => MarkAsRead()}>Mark as read</p>
                                    </div>
                                    <hr />
                                    <div className="notif-append">
                                        {/** Appends Notif Contents here */}
                                        {mapError && Array.isArray(notifContent) && (
                                            notifContent.map((notif, index) => {
                                                console.log('Notif:', notif);
                                                return (
                                                    <div className="notif-content" key={index}>
                                                        <p>Item #{notif.book_id} : {notif.books.book_title}</p>
                                                        <p>{notif.buyer_name === user.account_name ? 
                                                            "Item Added To Your Transaction" : "Someone Bought Your Item"}
                                                        </p>
                                                    </div>
                                                );
                                            })
                                        )}
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

