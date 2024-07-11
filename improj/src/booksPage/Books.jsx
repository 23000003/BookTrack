import '../styles/book.css'
import BookDetails from './BookDetails';
import BookHook from './BooksHook'
import useBookData from './FetchBookData'
import { useState, useEffect } from 'react';
import staticbg from './Stylefilter';
import { useNavigate } from 'react-router-dom';

export default function DisplayBooks({Genre, filterGenre, setfilterGenre}) {
    const { bookData, loading } = useBookData(); // Using the hook to get bookData and loading state
    const { passDets, bookDets, DisplayDets } = BookHook();
    const [booksecback, setBooksecback] = useState('');
    const navigate = useNavigate();

    const chosenGenre = bookData.filter(genreData => genreData.genre === Genre);

    useEffect(() => {
        setBooksecback(filterGenre ? 'none' : 'block');
        staticbg(Genre, filterGenre);
    }, [Genre, filterGenre]);

    console.log(bookData)
    return (
        <>
            {!bookDets ? (
                <div id="BookSection">
                    <button id="Booksec-back" style={{display: booksecback}} onClick={() => setfilterGenre(true)}>X Exit</button>
                    <div className="LabelArea">
                        <span>Books</span>
                    </div>
                    <div className="FlexBooks" style={{justifyContent: 'center'}}>
                        <div className="BookArea">
                            <div className="Books-Column">
                                {loading ? (
                                    <div className='loading'> 
                                        <div className='loader'></div>
                                    </div>
                                ) : (
                                    filterGenre ? (
                                        bookData.map((genreData, idx) => (
                                            <div key={idx}>
                                                <h2>{genreData.genre}</h2>
                                                <hr></hr>
                                                <div className="bg">
                                                    {genreData.data.map((book, index) => (
                                                        <div className="first" key={index}>
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
                                                                        () => navigate(`/books/${book.book_title}?Details`, 
                                                                        {state: {book}})
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
                                                                        () => navigate(`/books/${book.book_title}?Details`, 
                                                                        {state: {book}})
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
