import { useEffect } from "react";
import '../styles/ViewOrders.css';
import { useLocation } from "react-router-dom";
import useFetchComponentsHook from "../Supabase/ComponentsHook";

export default function ViewOrders() {
    const location = useLocation();
    const { viewOrders } = useFetchComponentsHook("ViewOrders", location.state.user.account_name);
    console.log("HEYYY", viewOrders);

    useEffect(() => {
        document.body.style.backgroundColor = 'rgb(238, 238, 238)';

        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);

    return (
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
                                        <h3>{order.buyer_name}</h3>
                                        <h3>Bought Item #{order.book_id}</h3>
                                        <button>View Details</button>
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
    );
}
