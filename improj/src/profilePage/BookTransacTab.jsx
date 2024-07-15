import UserHook from "../Supabase/UserSessionData";
import FetchBook from "./profileDataHook";
import { useState } from "react";
import useTransacHook from "./TransacTabHook";

export default function BookSellTab(){

    const {user} = UserHook();
    const {tabData, loading} = FetchBook('transaction', user.account_name, user.account_id)
    console.log(user.account_id);
    const [data, setData] = useState([]);
    const [ItemTrigger, setItemTrigger] = useState(false);
    const {ItemNotClaimed, ItemClaimed} = useTransacHook();

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

    console.log("transaction", tabData)
    console.log("loading", loading)

    return(
        <div className="ItemProcess">
            {loading ? (
                <div className='loading'>  
                        <div className='loader'></div>
                    </div>
                ) : (
                tabData.map((book, index) =>(
                    <div key={index} className="on-sale">
                        <div className="quantity-onsale">Quantity: {book.quantity}</div>
                        <div className="sell">
                            <button className="sell-button" onClick={() => ViewItem(book)}>View Process</button> 
                        </div>
                        <div className="on-sale-image">
                            <img src={book.books.imagetag} alt="Book Image" />
                        </div>
                        <div className="on-sale-text">
                            <hr />
                            <span>{book.books.book_title}</span>
                            <span>₱{book.price}.00</span>
                        </div>
                    </div>
                ))
            )}
            
            {ItemTrigger && (
                <>
                <div className="exposure" onClick={() => ExitViewItem()}></div>
                <div className="Process-container">
                    <div className="process-image">
                        <div className="process-image2">
                            <img src={data.books.imagetag}/>
                        </div>
                    </div>
                    <div className="process-details">
                        <div className="process-texts">
                            <span>Seller: {data.seller_name}</span>
                            <span>Item Name: {data.books.book_title}</span>
                            <span>Item Price: P{data.books.book_price}.00</span>
                            <span>Status: {data.accept === false ? "Pending" : "Accepted"}</span>
                        </div>
                        <div className="process-user-details">
                            <span style={{marginBottom: "10px"}}><b>Your Details:</b></span>
                            
                            <label htmlFor="full_name">Full Name:
                                <input placeholder={data.full_name} id="full_name" style={{marginLeft: "15px"}} disabled></input>
                            </label>

                            <label htmlFor="contact" style={{marginTop:"8px"}}>Contact:
                                <input placeholder={data.contact_no} id="contact" style={{marginLeft: "15px"}} disabled></input>
                            </label>
                            {data.order_type === "pickup" ? (
                                <label htmlFor="type" style={{marginTop:"8px"}}>Type:
                                    <input placeholder={data.order_type} id="type" style={{marginLeft: "15px"}} disabled></input>
                                </label>
                            ) : (
                                <>
                                <label htmlFor="type" style={{marginTop:"8px"}}>Type:
                                    <input placeholder={data.order_type} id="type" style={{marginLeft: "15px"}} disabled></input>
                                </label>
                                <label htmlFor="location" style={{marginTop:"8px"}}>Location:
                                    <input placeholder={data.location} id="location" style={{marginLeft: "15px"}} disabled></input>
                                </label>
                                </>
                            )}
                            {data.order_type !== 'COD' && (
                                <label htmlFor="ref" style={{marginTop:"8px"}}>Reference Number:
                                    <input placeholder={data.ref_no} id="ref" style={{marginLeft: "15px"}} disabled></input>
                                </label>
                            )}
                        </div>
                        <div className="buttonclaim">
                            {data.accept === false ? (
                                <>
                                <button className="disabled" disabled>Item Not Claimed</button>            
                                <button className="disabled" disabled>Item Claimed</button>
                                </>
                            ) : (
                                <>
                                <button className="itemnotclaimed" onClick={() => ItemNotClaimed(data)}>Item Not Claimed</button>            
                                <button className="itemclaimed" onClick={() => ItemClaimed(data)}>Item Claimed</button>
                                </>
                            )}
                        </div>
                    </div>
                </div> 
                </>
            )}
        </div>
    );
}