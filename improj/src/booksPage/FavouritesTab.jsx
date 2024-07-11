import { useEffect, useState } from 'react'
import supabase from '../Supabase/Supabase'

export default function FavouriteTab({handleCloseMenu, user}){

    const [favouriteData, setFavouriteDate] = useState([]);

    useEffect(() =>{
        const fetch  = async() =>{
            const {data} = await supabase.from('favourites')
            .select(`
                account_name,
                books(
                    id,
                    book_title,
                    book_quantity,
                    book_price,
                    description,
                    imagetag,
                    in_process,
                    isApprove,
                    book_type
                )
            `)
            .eq('account_name', user.name);

            setFavouriteDate(data);
        }
        fetch()
    },[])

    return(
        <>
        <div className="Menu-bar-Favourite">
            <div className="Account" onClick={handleCloseMenu}>
                <span className="favourite-label">Favourite Books</span>
            </div>
            <hr />
        </div>
        <div className="menus-choice">
            {favouriteData > 0 ? (
                favouriteData.map((data, index) =>(
                    <div className="book-favourites" key={index}>
                        <div className="users-book-favourite">
                            <img src={data.imagetag} alt="" />
                            <h4 style={{marginLeft: "10px"}}>{data.book_title}</h4>
                        </div>
                        <button className="favourite-view">View</button>
                    </div>
                ))
            ) : (
                <div className="no-favourite">
                    <span>No Favourites</span>
                </div>
            )}
        </div>
        </>
    )
}