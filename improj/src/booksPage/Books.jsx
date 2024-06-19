import '../styles/book.css'
import BookDetails from './BookDetails';
import BookHook from './BooksHook'
import useBookData from './BooksDataHook'
import { useState, useEffect } from 'react';
import staticbg from './Stylefilter';

export default function DisplayBooks({Genre, filterGenre, setfilterGenre}) {
    const { bookData, loading } = useBookData(); // Using the hook to get bookData and loading state
    const { passDets, bookDets, DisplayDets } = BookHook();
    const [booksecback, setBooksecback] = useState('');
    
    const chosenGenre = bookData.filter(genreData => genreData.genre === Genre);

    useEffect(() => {
        setBooksecback(filterGenre ? 'none' : 'block');
        staticbg(Genre, filterGenre);
    }, [Genre, filterGenre]);


    return (
        <>
            {!bookDets ? (
                <div id="BookSection">
                    <button id="Booksec-back" style={{display: booksecback}} onClick={() => setfilterGenre(true)}>X Exit</button>
                    <div className="LabelArea">
                        <span>Books</span>
                    </div>
                    <div className="FlexBooks">
                        <div className="BookArea">
                            <div className="Books-Column">
                                {loading ? ( 
                                    <div>Loading...</div>
                                ) : (
                                    filterGenre ? (
                                        bookData.map((genreData, idx) => (
                                            <div key={idx}>
                                                <h2>{genreData.genre}</h2>
                                                <hr></hr>
                                                <div className="bg">
                                                    {genreData.data.map((book, index) => (
                                                        <div className="first" key={index}>
                                                            <img src={book.imagetag} alt="" />
                                                            <div className="text">
                                                                <div className="titlediv">
                                                                    <label>{book.book_title}</label>
                                                                </div>
                                                                <div className="price">
                                                                    <p>P{book.book_price}</p>
                                                                </div>
                                                                <span className="Buybutton" onClick={() => DisplayDets(book)}>Buy</span>
                                                            </div>
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
                                                            <img src={book.imagetag} alt="" />
                                                            <div className="text">
                                                                <div className="titlediv">
                                                                    <label>{book.book_title}</label>
                                                                </div>
                                                                <div className="price">
                                                                    <p>P{book.book_price}</p>
                                                                </div>
                                                                <span className="Buybutton" onClick={() => DisplayDets(book)}>Buy</span>
                                                            </div>
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
                <BookDetails {...passDets} DisplayDets={DisplayDets} />
            )}
        </>
    );
}

