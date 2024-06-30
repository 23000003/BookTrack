import UserHook from "../Supabase/UserSessionData";
import FetchBook from "./profileDataHook";
import { useState } from "react";


export default function BookSellTab(){

    const {user} = UserHook();
    const {tabData, loading} = FetchBook('Books_Sell', user.account_name)
    const [data, setData] = useState([]);
    const [ItemTrigger, setItemTrigger] = useState(false);

    const ViewItem = (data) =>{
        setItemTrigger(true);
        setData(data);
        document.body.style.overflow = "hidden";
        console.log(data);
    }

    const ExitViewItem = () =>{
        setItemTrigger(false);
        document.body.style.overflow = "auto";
    }

    console.log("sell", tabData)
    console.log("loading", loading)
    return(
        <div className="ItemSale">
            {loading ? (
                <div className='loading'>  
                        <div className='loader'></div>
                    </div>
                ) : (
                tabData.map((book, index) =>(
                    <div key={index} className="on-sale">
                        <div className="quantity-onsale">Quantity: {book.book_quantity}</div>
                        <div className="sell">
                            <button className="sell-button" onClick={() => ViewItem(book)}>View Item</button>
                        </div>
                        <div className="on-sale-image">
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
            
            
            {ItemTrigger && (
                <>
                <div className="exposure1" onClick={() => ExitViewItem()}></div>
                <div className="Sell-container">
                    <div className="sell-image">
                        <div className="sell-image2">
                            <img src={data.imagetag}/>
                        </div>
                    </div>
                    <div className="sell-details">
                        <h3>Item Details:</h3>
                        <div className="sell-texts">
                            <span>Item Name: <input type="text" id="item-title" placeholder={data.book_title} disabled/></span>
                            <span>Item Price: <input type="text" id="item-price" placeholder={`P${data.book_price}.00`} disabled/></span>
                            <span>Quantity: <input type="text" id="item-quantity" placeholder={data.book_quantity} disabled/></span>
                            <span>Description: </span><textarea type="text" id="item-description" placeholder={data.description} disabled></textarea>

                        </div>
                        <div className="buttonsold">
                            <button id="itemcancel">X Cancel</button>
                            <button id="itemupdate">Update</button>            
                            <button id="itemedit" >Edit Item</button> 
                            <button id="itemsold">Mark As Sold</button>
                        </div>
                    </div>
                </div>
                </>
            )}
            
        </div>
    );
}