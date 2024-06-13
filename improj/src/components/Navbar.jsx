import { useState } from "react";

export default function Navbar(){

    const [showNotif, SetNotif] = useState(false);

    const Notificationbar = () =>{
        if(showNotif === false){
            SetNotif(true);
        }else{
            SetNotif(false);
        }
    }

    return(
    <div className="wrapper">
        <div className="navbar">
            <div className="navbar_left">
                <div className="logo">
                    <a href="#"><img src="https://wfiljmekszmbpzaqaxys.supabase.co/storage/v1/object/public/images/BookTrack__4_.png?t=2024-05-29T13%3A51%3A43.693Z" alt="" className="Booktrack"/></a>
                </div>
            </div>
            <div className="navbar_right">
                <div className="profile">
                    <div className="icon_wrap">
                        <button type="button" className="icon-button" onClick={Notificationbar}> {/*Add on Click function to show notification*/}
                            <span className="material-icons">notifications</span>
                            <span className="icon-button__badge">1</span>
                        </button>
                        <a href="profile.html" className="profile-link" target="_blank">
                            <img
                                src="https://wfiljmekszmbpzaqaxys.supabase.co/storage/v1/object/public/images/pfp.jpg?t=2024-05-29T05%3A50%3A57.482Z"
                                alt="profile_pic"
                                style={{ borderRadius: '2em' }}
                            />                            
                            <span className="name">Kenny Maratas</span>
                            <i className="fas fa-chevron-down"></i>
                        </a>                     
                    </div>
                </div>
                { showNotif && <div className="notif-bar">
                    <div className="notif-texts">
                        <div className="label-notif">
                            <p>Notifications</p>
                            <p id="notif-count">0</p>
                            <p className="read">Mark as read</p> {/*Add on Click function to delete notification*/}
                        </div>
                        <hr></hr>
                        <div className="notif-append">
                            {/* <!-- <div class="notif-content">
                                <p>Item #432 : Great Expectations</p>
                                <p>Added to your Process</p>
                            </div>
                            <div class="notif-content">
                                <p>Item #432 : Great Expectations</p>
                                <p>Added to your Process</p>
                            </div> --> */}
                        </div>
                    </div>
                </div> }
            </div>
        </div>
    </div>
    );
}