import './Navbar.css';

export default function Navbar(){

    return(
        <div class="wrapper">
        <div class="navbar">
            <div class="navbar_left">
                <div class="logo">
                    <a href="#"><img></img></a>
                </div>
            </div>
            <div class="navbar_right">
                <div class="profile">
                    <div class="icon_wrap">
                        <button type="button" class="icon-button" onclick="notificationbar()">
                            <span class="material-icons">notifications</span>
                            <span class="icon-button__badge">1</span>
                        </button>
                        <a href="profile.html" class="profile-link" target="_blank">
                            <img></img>
                            <span class="name">Kenny Maratas</span>
                            <i class="fas fa-chevron-down"></i>
                        </a>                     
                    </div>
                </div>
                <div class="notif-bar">
                    <div class="notif-texts">
                        <div class="label-notif">
                            <p>Notifications</p>
                            <p id="notif-count">0</p>
                            <p class="read" onclick="markasread()">Mark as read</p>
                        </div>
                        <hr></hr>
                        <div class="notif-append">
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
                </div>
            </div>
        </div>
    </div>
    );
}