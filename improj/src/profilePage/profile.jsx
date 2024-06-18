import { useState } from "react";
import profileData from './profileDataHook'
import './profile.css'
import UserHook from "../LandingPage/UserSessionData";

export default function Profile(){

    const {user, checkUser} = UserHook();
    const {tabData, loading} = profileData(user.account_name);
    const [userTab, setUserTab] = useState('Books_Sell');
    const [ItemTrigger, setItemTrigger] = useState(false);
    const [transacTrigger, setTransacTrigger] = useState(false);
    const [data, setData] = useState([]);
    
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

    return(
        <>
            <div className="container">
                <div className="background">
                    <div className="Pfp">
                        <img className="pfpimg" src={user.profile}/>
                        <div className="username user-label">
                            <p>{user.account_name}</p>
                            <p>|</p>
                            <a href="https://www.facebook.com/kentward.maratas.7" target="_blank">
                                <img src="https://freepnglogo.com/images/all_img/1713419166FB_Logo_PNG.png" alt="" style={{marginTop: "5px"}}/>
                            </a>
                        </div>
                    </div>
                </div>
                
                <div className="User-Account">
                    <div className="choices">
                        <span onClick={() => setUserTab('Books_Sell')}>Items On Sale</span> 
                        <span id="totalitems"></span> 
                        <span style={{marginLeft: "45px"}} onClick={() => setUserTab('Books_Sold')}>Items Sold</span> 
                        <span style={{marginLeft: "50px"}} onClick={() => setUserTab('History')}>History</span>
                        <span style={{marginLeft: "50px"}}>|</span>
                        <span id="process-notif">1</span> 
                        <span style={{marginLeft: "40px"}} onClick={() => setUserTab('In_Process')}>Transaction</span> 
                    </div>
                    <hr className="Hr"/>

                    {userTab === 'Books_Sell' && (
                        <div className="ItemSale">
                             {loading ? (
                                <div>Loading...</div>
                             ) : (
                                tabData.filter((item) => item.tab === 'Books_Sell').map(item => (
                                    item.tempdata.map(book =>( // As it is an array of objects with an array
                                        <div key={book.id} className="on-sale">
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
                                            <button id="itemedit" >Edit Item</button> {/**onclick="editItemDetails()" */}
                                            <button id="itemsold">Mark As Sold</button>
                                        </div>
                                    </div>
                                </div>
                                </>
                            )}
        
                        </div>
                    )}
                    
                    {userTab === 'Books_Sold' && (
                        <div className="ItemSold">
                        
                            {tabData.filter((item) => item.tab === 'Books_Sold').map(item => (
                                item.tempdata.map(book =>(
                                    <div key={book.id} className="on-sale">
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
                            ))}
                
                        </div>
                    )}
                    
                    {userTab === 'History' && (
                        <div className="ItemHistory">

                            {tabData.filter((item) => item.tab === 'History').map(item => (
                                item.tempdata.map(book =>(
                                    <div key={book.id} className="on-sale">
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
                            ))}
                                 
                        </div>
                    )}
                    
                    {userTab === 'In_Process' && (
                        <div className = "ItemProcess">
                            {tabData.filter((item) => item.tab === 'In_Process').map(item => (
                                item.tempdata.map(book =>(
                                    <div key={book.id} className="on-sale">
                                        <div className="quantity-onsale">Quantity: {book.book_quantity}</div>
                                        <div className="sell">
                                            <button className="sell-button" onClick={() => ViewItem(book)}>View Process</button> 
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
                            ))}
                            
                            { ItemTrigger && ( 
                            <>
                            <div className="exposure" onClick={() => ExitViewItem()}></div>
                            <div className="Process-container">
                                <div className="process-image">
                                    <div className="process-image2">
                                        <img src={data.imagetag}/>
                                    </div>
                                </div>
                                <div className="process-details">
                                    <div className="process-texts">
                                        <span>Seller: {data.seller_name}</span>
                                        <span>Item Name: {data.book_title}</span>
                                        <span>Item Price: P{data.book_price}.00</span>
                                    </div>
                                    <div className="buttonclaim">
                                        <button className="itemnotclaimed" style={{marginRight: "5px"}}>Item Not Claimed</button>            
                                        <button className="itemclaimed">Item Claimed</button>
                                    </div>
                                </div>
                            </div> 
                            </>
                            )}
                        </div>
                    )}
                    
                </div>
            </div>
            <div style={{marginBottom: "150px"}}></div>
            <a href="Post.html" target="_blank"><button id="PostBox">POST ITEM</button></a>
        </>
    );
}