import { useEffect } from "react";
import '../styles/ViewOrders.css'

export default function ViewOrders(){

    useEffect(() =>{
        document.body.style.backgroundColor = 'rgb(238, 238, 238)';

        return () => {
            document.body.style.backgroundColor = '';
        }
    },[])

    return (
        <>
        <div className="view-orders">
            <div className="flex-orders">
                <div className="view-order-label">
                    <h3>Your Orders</h3>
                    <hr />
                </div>
                <div className="order-contents">
                    <div className="my-contents">
                        <div className="user-content">
                            <h3>Account Name</h3>
                            <h3>Bought Item #555</h3>
                            <button>View Details</button>
                        </div>
                    </div>
                    <div className="my-contents">
                        <div className="user-content">
                            <h3>Account Name</h3>
                            <h3>Bought Item #555</h3>
                            <button>View Details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
      );
}