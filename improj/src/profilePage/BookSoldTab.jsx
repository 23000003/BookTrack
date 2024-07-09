import UserHook from "../Supabase/UserSessionData";
import FetchBook from "./profileDataHook";

export default function BookSoltTab(){

    const {user} = UserHook();
    const {tabData, loading} = FetchBook('books_sold', user.account_name)
    console.log("sold", tabData)
    
    return(
        <>
        <div className="ItemSold">
            {loading ? (
                <div className='loading'>  
                        <div className='loader'></div>
                    </div>
                ) : (
                tabData.map((book, index) =>(
                    <div key={index} className="on-sale">
                        <div className="sold">
                            <span>SOLD</span>
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