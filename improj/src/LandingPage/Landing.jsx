import '../styles/landing.css'
import Background from '../assets/background.jpg'
import { Link } from 'react-router-dom';
import UserHook from '../Supabase/UserSessionData';

export default function LandingPage(){

    const {user, checkUser, userloading} = UserHook();

    return(
    <div className="content">
        <div className="upper">
            <p className="title">WELCOME TO BOOKTRACK</p>
            <img src={Background} alt="background_image"/>
            <div className="container1">
                <Link to="/books" className='browse'>
                    <button className="browse" href="#">
                        Browse Books
                    </button>
                </Link>
                {checkUser ? (
                    userloading ? (
                        <div className='loader'></div>
                    ):(
                        <button className='login'>Welcome {user.account_name}</button>
                    )
                ):(
                    <Link to="/login" className='login'>
                        <button className="login" href="#">
                            Log In
                        </button>
                    </Link>
                )}
            </div>
        </div>
        <div className="bottom">
            <p>Track your favorite Books!</p>
            <div className="box box1">
                <div className="circle" id="circle1">
                    <i className='bx bx-map-alt' ></i>
                </div>
                <p className="cphrase">Find the nearest source</p>
                <p className="sente">Discover local bookstores and book sellers that have the books you’re looking for. Save time and ensure you get your hands on the books quickly and easily.</p>
            </div>
            <div className="box box2">
                <div className="circle" id="circle2">
                    <i className='bx bx-credit-card'></i>
                </div>
                <p className="cphrase">Save your time</p>
                <p className="sente">With our streamlined search and recommendation system, find the books you want without endless browsing. Our smart filters and personalized suggestions help you get exactly what you need.</p>
            </div>
            <div className="box box3" >
                <div className="circle" id="circle3">
                    <i className='bx bx-heart' ></i>
                </div>
                <p className="cphrase">Post your Book</p>
                <p className="sente">Share your book collection with others. Whether you’re looking to sell, lend, or simply showcase your favorite reads, our platform makes it easy to connect with fellow book enthusiasts.</p>
            </div>
        </div>
    </div>
    );
}