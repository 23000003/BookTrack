import { useEffect } from 'react';
import '../styles/ViewOrders.css';
import '../profilePage/profile.css'
import useFetchComponentsHook from '../Supabase/ComponentsHook';
import supabase from '../Supabase/Supabase';
import { useLocation } from 'react-router-dom';


export default function MyEbooksTab() {

    const location = useLocation();
    const { eBooks } = useFetchComponentsHook("EBooksTab", location.state.user.account_name);

    useEffect(() => {
        document.body.style.backgroundColor = 'rgb(238, 238, 238)';
        
        return () => {
            document.body.style.backgroundColor = '';
        };
    }, []);


    const DownloadEbook = async (file) => {

        console.log(file)

        const { data, error } = await supabase.storage
            .from('images')
            .download('ebooks/' + file);
        
            console.log(data)
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
                        <>
                        <div key={index} className="on-sale">
                            <div className="sell">
                                <button className="sell-button" onClick={() => DownloadEbook(ebook.books.file)}>Download</button>
                            </div>
                            <div className="on-sale-image">
                                <img src={ebook.books.imagetag} alt="Book Image" />
                            </div>
                            <div className="on-sale-text">
                                <hr />
                                <span>{ebook.books.book_title}</span>
                                <span>File: {ebook.books.file}</span>
                            </div>
                        </div>
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
}
