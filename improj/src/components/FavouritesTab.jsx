import { useEffect, useState } from 'react'
import supabase from '../Supabase/Supabase'
import { useNavigate } from 'react-router-dom';
import noreq from '../assets/no_request.png'

export default function FavouriteTab({handleCloseMenu, user}){

    const [favouriteData, setFavouriteData] = useState([]);
    const navigate = useNavigate();

    useEffect(() =>{
        const fetch  = async() =>{
            const {data} = await supabase.from('favourites')
            .select(`
                account_name,
                books( * )
            `)
            .eq('account_name', user.account_name);
            
            console.log(data)
            setFavouriteData(data);
        }
        fetch()
        console.log(user)
    },[])

    console.log("favourite",favouriteData)

    return(
        <>
        <div className="Menu-bar-Favourite">
            <div className="Account" onClick={handleCloseMenu}>
                <span className="favourite-label">Favourite Books</span>
            </div>
            <hr />
        </div>
        <div className="menus-choice">
            {favouriteData.length > 0 ? (
                favouriteData.map((data, index) =>(
                    <div className="book-favourites" key={index}>
                        <div className="users-book-favourite">
                            <img src={data.books.imagetag} alt="" />
                            <h4 style={{marginLeft: "10px"}}>{data.books.book_title}</h4>
                        </div>
                        {data.books.book_type === 'physical' ? (
                            <button className="favourite-view" 
                                onClick={() => {navigate(`/books/${data.books.book_title}?Details`, 
                                {state: {book: data.books, user}}), handleCloseMenu();}
                            }>View</button>
                        ):(
                            <button className="favourite-view" 
                                onClick={() => {navigate(`/e-books/${data.books.book_title}?Details`, 
                                {state: {book: data.books, user}}), handleCloseMenu();}
                            }>View</button>
                        )}
                    </div>
                ))
            ) : (
                <div className="no-favourite">
                    <img src={noreq} alt="" />
                    <span>No Favourites :(</span>
                </div>
            )}
        </div>
        </>
    )
}