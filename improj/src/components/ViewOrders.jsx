import { useEffect, useState } from "react";
import '../styles/ViewOrders.css';
import { useLocation } from "react-router-dom";
import useFetchComponentsHook from "../Supabase/ComponentsHook";
import nopfp from '../assets/nopfp.png'

export default function ViewOrders() {
    
    const [viewUserInfo, setViewUserInfo] = useState({});
    const [triggerView, setTriggerView] = useState(false);
    const location = useLocation();
    const { viewOrders } = useFetchComponentsHook("ViewOrders", location.state.user.account_name);
    console.log("HEYYY", viewOrders);

    useEffect(() => {
        document.body.style.backgroundColor = 'rgb(238, 238, 238)';

        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);
    
    const ViewOrder = (data) =>{
        if(triggerView === false){
            setViewUserInfo(data);
            setTriggerView(!triggerView);
        }else{
            setViewUserInfo({});
            setTriggerView(!triggerView);
        }
        
    }

    return (
        <>
        <div className="view-orders">
            <div className="flex-orders">
                <div className="view-order-label">
                    <h3>Your Orders</h3>
                    <hr />
                </div>
                <div className="order-contents-overflow">
                    <div className="order-contents">
                        {viewOrders && viewOrders.length > 0 ? (
                            viewOrders.map((order, index) => (
                                <div key={index} className="my-contents">
                                    <div className="user-content">
                                        <h3>{order.buyer_name.account_name}</h3>
                                        <h3>Bought Item #{order.book_id}</h3>
                                        <button onClick={() => ViewOrder(order)}>View Details</button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div>No Orders Yet...</div> // Style this
                        )}
                    </div>
                </div>
            </div>
        </div>
        
        {triggerView && (
            <div className="order-user-information">
                <div className="order-user-name">
                    <img src={nopfp} alt="" />
                    <div>
                        <h3>{viewUserInfo.buyer_name.account_name}</h3>
                        <p>Buyer</p>
                        <button>Send Email</button>
                    </div>
                </div>
                <hr />
                <div className="order-user-detailInfo">
                    <h5 style={{padding: "10px 0px 10px 0px"}}>BUYER INFORMATION</h5>

                    <div className="user-info-row">
                        <div className="user-info-column">
                            <div className="user-column-label">
                                <span>Full Name</span>
                                <span>{viewUserInfo.full_name}</span>
                            </div>
                        </div>
                        <div className="user-info-column">
                            <div className="user-column-label">
                                <span>Email</span>
                                <span>{viewUserInfo.buyer_name.email}</span>
                            </div>
                        </div>
                    </div>

                    <div className="user-info-row">
                        <div className="user-info-column">
                            <div className="user-column-label">
                                <span>Contact No:</span>
                                <span>{viewUserInfo.contact_no}</span>
                            </div>
                        </div>
                        <div className="user-info-column">
                            <div className="user-column-label">
                                <span>Reference Number:</span>
                                <span>{viewUserInfo.ref_no}</span>
                            </div>
                        </div>
                    </div>

                    <div className="user-info-row">
                        <div className="user-info-column">
                            <div className="user-column-label">
                                <span>Item Name:</span>
                                <span>{viewUserInfo.books.book_title}</span>
                            </div>
                        </div>
                        <div className="user-info-column">
                            <div className="user-column-label">
                                <span>Quantity & Price:</span>
                                <span>{viewUserInfo.quantity}, P{viewUserInfo.price}</span>
                            </div>
                        </div>
                    </div>
                    {/* price, quantity, ref, buyer name, 
                        buyer full_name, buyer-contact no,
                        buyer email, location, ordertype*/}
                </div>
                <hr />
                <div className="order-user-buttonApp">
                    <button>Not Sent</button>
                    <button>Sent</button>
                </div>
            </div>
        )}
        </>
    );
}
