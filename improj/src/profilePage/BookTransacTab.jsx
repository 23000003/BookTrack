import FetchBook from "./profileDataHook";
import { useState } from "react";
import useTransacHook from "./TransacTabHook";
import emptydata from '../assets/EmptyData.jpg'
import { useLocation } from "react-router-dom";
import useBookDetailsHook from "../booksPage/BookDetailsHook";

export default function BookSellTab(){

    const location = useLocation()
    const user = location.state.user;

    const {tabData, loading} = FetchBook('transaction', user.account_name, user.account_id)
    console.log(user.account_id);
    const [data, setData] = useState([]);
    const [ItemTrigger, setItemTrigger] = useState(false);
    const {ItemNotClaimed, ItemClaimed} = useTransacHook();
    const [confirmationButton, setConfirmButton] = useState(false)
    const [triggerMessage, setTriggerMessage] = useState(false);

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

    const {SendMessageFunc, messageRef, setMessageContent} = useBookDetailsHook(tabData, null, user)

    return(
        <div className="ItemProcess">
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
                            <div className="quantity-onsale">{book.books.book_type === 'e-book' ? "E-Book" :  `Quantity: ${book.quantity}`}</div>
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
                ) : (
                    <div className="empty-data">
                        <img src={emptydata} />
                        <h2 style={{marginLeft: "30px"}}>No Transactions For Now ...</h2>
                    </div>
                )
            )}
            
            {ItemTrigger && (
                <>
                <div className="exposure" onClick={() => ExitViewItem()}></div>
                <div className="Process-container">
                    <div className="process-image">
                        <div className="process-image2">
                            <img src={data.books.imagetag}/>
                        </div>
                        <hr/>
                    </div>
                    <div className="process-details">
                        <div className="process-texts">
                            <div>
                                <h4>Order Details:</h4>
                                <span>Seller: {data.seller_name}
                                <svg onClick={() => setTriggerMessage(!triggerMessage)}
                                    xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chat-dots-fill bi-message-icon" viewBox="0 0 16 16">
                                    <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                                </svg>
                                {triggerMessage && (
                                    <span className="send-a-message-details abs" ref={messageRef}>
                                        <div style={{ display: "flex", flexDirection: "row", marginTop: "-0px" }}>
                                            <input type="text"
                                                placeholder='Send A Message...'
                                                onChange={(e) => setMessageContent(e.target.value)}
                                            />
                                            <svg xmlns="http://www.w3.org/2000/svg" onClick={() => SendMessageFunc(data.seller_name)}
                                                width="16" height="16" fill="currentColor" className="bi bi-send-fill bi-message-icon" viewBox="0 0 16 16">
                                                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                                            </svg>
                                        </div>
                                    </span>
                                )}
                                </span>
                                <span>Item Name: {data.books.book_title}</span>
                                <span>Item Price: P{data.books.book_price}.00</span>
                                <span className={data.accept === false ? "Pending" : "Accepted"}>
                                    Status: {data.accept === false ? "Pending" : "Accepted"}
                                </span>
                            </div>
                        </div>
                        <div className="process-user-details">
                            {data.books.book_type === 'physical' ? (
                                <>
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
                                </>
                            ) : (
                                <>
                                <span style={{marginBottom: "10px"}}><b>Your Details:</b></span>
                                
                                <label htmlFor="full_name">Full Name:
                                    <input placeholder={data.full_name} id="full_name" style={{marginLeft: "15px"}} disabled></input>
                                </label>

                                <label htmlFor="contact" style={{marginTop:"8px"}}>Contact:
                                    <input placeholder={data.contact_no} id="contact" style={{marginLeft: "15px"}} disabled></input>
                                </label>
                                <label htmlFor="ref" style={{marginTop:"8px"}}>Reference Number:
                                        <input placeholder={data.ref_no} id="ref" style={{marginLeft: "15px"}} disabled></input>
                                </label>
                                </>
                            )}
                        </div>
                        <div className="buttonclaim">
                            {data.books.book_type === 'physical' ? (
                                data.accept === false ? (
                                    <button className="disabled" disabled>Item Claimed</button>
                                ) : (
                                    <button className="itemclaimed" onClick={() => setConfirmButton(true)}>Item Claimed</button>
                                )
                            ) : (
                                <>
                                <h3>Waiting For Release...</h3>
                                </>
                            )}
                        </div>
                        {confirmationButton && (
                        <>
                            <div className="exposure expoconfir"></div>
                            <div className="confirmation">
                                <h3>Confirm {confirmType}?</h3>
                                <div className="confirmation-buttons">
                                    <button onClick={() => setConfirmButton(false)}>
                                        Decline
                                    </button>
                                    <button onClick={() => ItemClaimed(data)}>
                                        Confirm
                                    </button>
                                </div>
                            </div>
                        </>
                        )}
                    </div>
                </div> 
                </>
            )}
        </div>
    );
}