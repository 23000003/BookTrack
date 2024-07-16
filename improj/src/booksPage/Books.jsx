import '../styles/book.css'
import BookDetails from './BookDetails';
import BookHook from './BooksHook'
import useBookData from './FetchBookData'
import { useState, useEffect } from 'react';
import staticbg from './Stylefilter';
import { useNavigate } from 'react-router-dom';
import UserHook from '../Supabase/UserSessionData';

export default function DisplayBooks({Genre, filterGenre, setfilterGenre, searchPicked}) {

    const { bookData, loading } = useBookData();
    const { passDets, bookDets, DisplayDets } = BookHook();
    const [booksecback, setBooksecback] = useState('');
    const [filterSearch, setFilterSearch] = useState('')
    const [filterSearchGenre, setFilterSearchGenre] = useState('');

    const navigate = useNavigate();

    const chosenGenre = bookData.filter(genreData => genreData.genre === Genre);

    const {user} = UserHook();

    useEffect(() => {
        setBooksecback(filterGenre ? 'none' : 'block');
        staticbg(Genre, filterGenre);
        setFilterSearch('');
    }, [Genre, filterGenre]);

    useEffect(() =>{

        if(searchPicked !== ''){

            for (let i = 0; i < bookData.length; i++) {
                for (let j = 0; j < bookData[i].data.length; j++) {
                    if (bookData[i].data[j].book_title === searchPicked) {
                        setFilterSearchGenre(bookData[i]);
                        setFilterSearch(bookData[i].data[j]);
                        break;
                    }
                }
            }
            setBooksecback('block');
            console.log("Hey", filterSearch)
        }

    }, [searchPicked])

    console.log(bookData)
    return (
        <>
            {!bookDets ? (
                <div id="BookSection">
                    <button id="Booksec-back" style={{display: booksecback}} 
                        onClick={() => {setfilterGenre(true), setFilterSearch(''), setBooksecback('none')}}>X Exit</button>
                    <div className="LabelArea">
                        <span>Books</span>
                    </div>
                    <div className="FlexBooks">
                        <div className="BookArea">
                            <div className="Books-Column">
                                {loading ? (
                                    <div className='loading'> 
                                        <div className='loader'></div>
                                    </div>
                                ) : (
                                    filterSearch !== '' ? (
                                        <>
                                        <h2>{filterSearchGenre.genre}</h2>
                                        <hr></hr>
                                        <div className="bg">
                                            <div className="first">
                                            {filterSearch.second_hand === true && ( <div className="sec-hand">2nd Hand</div> )}
                                                {filterSearch.in_process === 0 && filterSearch.book_quantity === 0 ? (
                                                <>
                                                    <span className="out-of-stock1"></span> 
                                                    <span className="out-of-stock">OUT OF STOCK</span>
                                                    <img src={filterSearch.imagetag} alt="" />
                                                    <div className="text">
                                                        <div className="titlediv">
                                                            <label>{filterSearch.book_title}</label>
                                                        </div>
                                                        <div className="price">
                                                            <p>P{filterSearch.book_price}</p>
                                                        </div>
                                                    </div>
                                                </>
                                                ) : (
                                                    <>
                                                    <img src={filterSearch.imagetag} alt="" />
                                                    <div className="text">
                                                        <div className="titlediv">
                                                            <label>{filterSearch.book_title}</label>
                                                        </div>
                                                        <div className="price">
                                                            <p>P{filterSearch.book_price}</p>
                                                        </div>
                                                        <span className="Buybutton" 
                                                            onClick={
                                                            () => navigate(`${filterSearch.book_title}?Details`, 
                                                            {state: {book: filterSearch, user}})
                                                        }>
                                                        Buy</span>
                                                    </div>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        </>
                                    ) : (
                                        filterGenre ? (
                                            bookData.map((genreData, idx) => (
                                                <div key={idx}>
                                                    <h2>{genreData.genre}</h2>
                                                    <hr></hr>
                                                    <div className="bg">
                                                        {genreData.data.map((book, index) => (
                                                            <div className="first" key={index}>
                                                                {book.second_hand === true && ( <div className="sec-hand">2nd Hand</div> )}
                                                                {book.in_process === 0 && book.book_quantity === 0 ? (
                                                                <>
                                                                    <span className="out-of-stock1"></span> 
                                                                    <span className="out-of-stock">OUT OF STOCK</span>
                                                                    <img src={book.imagetag} alt="" />
                                                                    <div className="text">
                                                                        <div className="titlediv">
                                                                            <label>{book.book_title}</label>
                                                                        </div>
                                                                        <div className="price">
                                                                            <p>P{book.book_price}</p>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                                ) : (
                                                                    <>
                                                                    <img src={book.imagetag} alt="" />
                                                                    <div className="text">
                                                                        <div className="titlediv">
                                                                            <label>{book.book_title}</label>
                                                                        </div>
                                                                        <div className="price">
                                                                            <p>P{book.book_price}</p>
                                                                        </div>
                                                                        <span className="Buybutton" 
                                                                            onClick={
                                                                            () => navigate(`${book.book_title}?Details`, 
                                                                            {state: {book, user}})
                                                                        }>
                                                                        Buy</span>
                                                                    </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))
                                        ):(
                                            chosenGenre.map((genreData, idx) => (
                                                <div key={idx}>
                                                    <h2>{genreData.genre}</h2>
                                                    <hr></hr>
                                                    <div className="bg">
                                                        {genreData.data.map((book, index) => (
                                                            <div className="first" key={index}>
                                                            {book.second_hand === true && ( <div className="sec-hand">2nd Hand</div> )}
                                                                {book.in_process === 0 && book.book_quantity === 0 ? (
                                                                <>
                                                                    <span className="out-of-stock1"></span> 
                                                                    <span className="out-of-stock">OUT OF STOCK</span>
                                                                    <img src={book.imagetag} alt="" />
                                                                    <div className="text">
                                                                        <div className="titlediv">
                                                                            <label>{book.book_title}</label>
                                                                        </div>
                                                                        <div className="price">
                                                                            <p>P{book.book_price}</p>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                                ) : (
                                                                    <>
                                                                    <img src={book.imagetag} alt="" />
                                                                    <div className="text">
                                                                        <div className="titlediv">
                                                                            <label>{book.book_title}</label>
                                                                        </div>
                                                                        <div className="price">
                                                                            <p>P{book.book_price}</p>
                                                                        </div>
                                                                        <span className="Buybutton" 
                                                                            onClick={
                                                                            () => navigate(`${book.book_title}?Details`, 
                                                                            {state: {book, user}})
                                                                        }>
                                                                        Buy</span>
                                                                    </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))
                                        )
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>Hey</div>
            )}
        </>
    );
}
