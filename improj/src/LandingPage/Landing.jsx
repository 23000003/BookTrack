import '../styles/landing.css'
import Background from '../assets/background.jpg'
import { Link } from 'react-router-dom';

export default function LandingPage(){

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
                <Link to="/login" className='login'>
                    <button className="login" href="#">
                        Log In
                    </button>
                </Link>
            </div>
        </div>
        <div className="bottom">
            <p>Track your favorite Books!</p>
            <div className="box box1">
                <div className="circle" id="circle1">
                    <i className='bx bx-map-alt' ></i>
                </div>
                <p className="cphrase">Find the nearest source</p>
                <p className="sente">Lorem ipsum dolor sit amet dipisicingam, am dimiliquora. Saepe, quidem deleniti.</p>
            </div>
            <div className="box box2">
                <div className="circle" id="circle2">
                    <i className='bx bx-credit-card'></i>
                </div>
                <p className="cphrase">Save your time</p>
                <p className="sente">Lorem ipsum dolor sit amet dipisicingam, am dimiliquora. Saepe, quidem deleniti.</p>
            </div>
            <div className="box box3" >
                <div className="circle" id="circle3">
                    <i className='bx bx-heart' ></i>
                </div>
                <p className="cphrase">Post your Book</p>
                <p className="sente">Lorem ipsum dolor sit amet dipisicingam, am dimiliquora. Saepe, quidem deleniti.</p>
            </div>
        </div>
    </div>
    );
}