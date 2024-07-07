import { useEffect } from 'react';
import '../styles/ViewOrders.css';
import '../profilePage/profile.css'
import useFetchEBooks from '../Supabase/FetchEBook';
import supabase from '../Supabase/Supabase';


export default function MyEbooksTab() {

    useEffect(() => {
        document.body.style.backgroundColor = 'rgb(238, 238, 238)';
        return () => {
        document.body.style.backgroundColor = '';
        };
    }, []);

  const { eBooks } = useFetchEBooks();
  
    const DownloadEbook = async (file) => {

        const { data, error } = await supabase.storage
            .from('images')
            .download('ebooks/' + file);
    
        if (error) {
            console.log('Error getting public URL:', error);
        } else {
            console.log(data);

            const url = window.URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = file.split('/').pop(); 
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }
    };
  
    console.log(eBooks);
    return (
        <div className="view-orders">
            <div className="flex-orders">
                <div className="view-order-label">
                <h3>My E - Books</h3>
                <hr />
                </div>
                <div className="order-contents">
                    {eBooks.map((ebook, index) => (
                        <div key={index} className="on-sale">
                            <div className="quantity-onsale">Quantity: {ebook.book_quantity}</div>
                            <div className="sell">
                                <button className="sell-button" onClick={() => DownloadEbook(ebook.file)}>Download</button>
                            </div>
                            <div className="on-sale-image">
                                <img src={ebook.imagetag} alt="Book Image" />
                            </div>
                            <div className="on-sale-text">
                                <hr />
                                <span>{ebook.book_title}</span>
                                <span>₱{ebook.book_price}.00</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
