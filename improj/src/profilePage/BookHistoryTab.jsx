import UserHook from "../Supabase/UserSessionData";
import FetchBook from "./profileDataHook";
import emptydata from '../assets/EmptyData.jpg'
import { useLocation } from "react-router-dom";

export default function BookHistory(){

    const location = useLocation()
    const user = location.state.user;

    const {tabData, loading} = FetchBook('history', user.account_name, user.account_id)
    console.log("history", tabData)
    console.log(user)

    return(
        <>
        <div className="ItemHistory">
            {loading ? (
                <div className="grid-row grid-4-4">
                    <div className="cards">
                        <div className="card_image loading1"></div>
                        <div className="card_title loading1"></div>
                        <div className="card_description loading1"></div>
                    </div>
                    <div className="cards">
                        <div className="card_image loading1"></div>
                        <div className="card_title loading1"></div>
                        <div className="card_description loading1"></div>
                    </div>
                    <div className="cards">
                        <div className="card_image loading1"></div>
                        <div className="card_title loading1"></div>
                        <div className="card_description loading1"></div>
                    </div>
                    <div className="cards">
                        <div className="card_image loading1"></div>
                        <div className="card_title loading1"></div>
                        <div className="card_description loading1"></div>
                    </div>
                    <div className="cards">
                        <div className="card_image loading1"></div>
                        <div className="card_title loading1"></div>
                        <div className="card_description loading1"></div>
                    </div>
                </div>    
                ) : (
                tabData.length > 0 ? (
                    tabData.map((book, index) =>(
                        <div key={index} className="on-sale">
                            <div className="sold">
                                <span>{book.isFailed ? "FAILED" : "SUCCESS"}</span>
                            </div>
                            <div className="on-sold-image">
                                <img src={book.books.imagetag} alt="Book Image" />
                            </div>
                            <div className="on-sale-text">
                                <hr />
                                <span>{book.books.book_title}</span>
                                <span>₱{book.book_price}.00</span>
                            </div>
                        </div>
                    ))
                ):(
                    <div className="empty-data">
                        <img src={emptydata} />
                        <h2>No History For Now ...</h2>
                    </div>
                )
            )}
        </div>
        </>
    );
}