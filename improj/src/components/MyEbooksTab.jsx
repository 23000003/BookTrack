import { useEffect } from 'react';
import '../styles/ViewOrders.css'
import FetchEBook from '../Supabase/FetchEBook'

export default function MyEbooksTab(){

    useEffect(() =>{
        document.body.style.backgroundColor = 'rgb(238, 238, 238)';
        console.log("Hey");
        return () => {
            document.body.style.backgroundColor = '';
        }
    },[])

    const eBook = FetchEBook();

    console.log("Heyyyy", eBook);
    
    return(
        <>
        <div className="view-orders">
            <div className="flex-orders">
                <div className="view-order-label">
                    <h3>My E - Books</h3>
                    <hr />
                </div>
                <div className="order-contents">
                    <div className="my-contents">
                        <div className="user-content">
                            <h3>Item Title</h3>
                            <button>Dowload File</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}