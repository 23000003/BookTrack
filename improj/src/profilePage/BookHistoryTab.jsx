import UserHook from "../Supabase/UserSessionData";
import FetchBook from "./profileDataHook";

export default function BookHistory(){

    const {user} = UserHook();
    const {tabData, loading} = FetchBook('history', user.account_name)
    console.log("history", tabData)


    return(
        <>
        <div className="ItemHistory">
            {loading ? (
                <div className='loading'>  
                        <div className='loader'></div>
                    </div>
                ) : (
                tabData.map((book, index) =>(
                    <div key={index} className="on-sale">
                        <div className="sold">
                            <span>COMPLETED</span>
                        </div>
                        <div className="on-sold-image">
                            <img src={book.imagetag} alt="Book Image" />
                        </div>
                        <div className="on-sale-text">
                            <hr />
                            <span>{book.book_title}</span>
                            <span>₱{book.book_price}.00</span>
                        </div>
                    </div>
                ))
            )}
        </div>
        </>
    );
}