import nopfp from '../assets/nopfp.png'

export default function FavouriteTab(handleCloseMenu){

    return(
        <>
        <div className="Menu-bar-Favourite">
            <div className="Account" onClick={handleCloseMenu}>
                <span className="favourite-label">Favourite Books</span>
            </div>
            <hr />
        </div>
        <div className="menus-choice">
            <div className="book-favourites">
                <div className="users-book-favourite">
                    <img src={nopfp} alt="" />
                    <h4 style={{marginLeft: "10px"}}>Book Title</h4>
                </div>
                <button className="favourite-view">View</button>
            </div>
        </div>
        </>
    )
}