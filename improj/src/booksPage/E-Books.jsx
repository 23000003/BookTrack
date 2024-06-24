import '../styles/book.css'
import BookDetails from './BookDetails';
import BookHook from './BooksHook'
import useEBookData from './FetchEBookData'
import { useState, useEffect } from 'react';
import staticbg from './Stylefilter';
import SearchSuggest from './SearchSuggest';
import { Link } from 'react-router-dom';

export function DisplayBooks({Genre, filterGenre, setfilterGenre}) {
    const { ebookData, loading } = useEBookData(); 
    const { passDets, bookDets, DisplayDets } = BookHook();
    const [booksecback, setBooksecback] = useState('');
    
    const chosenGenre = ebookData.filter(genreData => genreData.genre === Genre);

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
                    <div className="FlexBooks" style={{justifyContent: 'center'}}>
                        <div className="BookArea">
                            <div className="Books-Column">
                                {loading ? ( 
                                    <div className='loading'> 
                                        <div className='loader'></div>
                                    </div>
                                ) : (
                                    filterGenre ? (
                                        ebookData.map((genreData, idx) => (
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

export default function Books(){

    const [genre, setGenre] = useState('');
    const [filterGenre, setfilterGenre] = useState(true);
    const [searchSuggest, setSearchSuggest] = useState('');

    console.log(searchSuggest);
    
    return(
        <>
        <div className='container'>
            <div className='background-search'>
                <div className="background-search">
                    <div className="background-search2">
                        <div className="search-bar">
                            <h3 style={{display: "flex"}}>Search Your Favourite Book!</h3>
                            <div className="form">
                                <div className="row">
                                    <div className="col">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="Book-Input"
                                            onChange={(e) => setSearchSuggest(e.target.value)}
                                            value={searchSuggest}
                                            placeholder="Enter book title..."
                                        />
                                    </div>
                                    <div className="col">
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="Location-Input"
                                        />
                                    </div>
                                    <div className="col1">
                                        <button className="btn" >SEARCH</button> {/*onclick="Search()"*/}
                                    </div>
                                </div>
                            </div>

                            <div className="Search-bar-suggest">
                                <SearchSuggest search={searchSuggest}/>
                                <div className="LocationSuggest">
                                    
                                </div>
                            </div>

                        </div>
                        <div className="image-bar">
                            <div className="image-container">
                                <img src="https://justbooks.in/_next/image?url=%2Fassets%2Fimages%2Fbanner%2Fbool3.png&w=640&q=75" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="genre">
                <div className="contents">
                    <h2 id="genre-label">Genres</h2>
                    <div className="image-labels">
                        <div className="label Romance" onClick={() => {setGenre('Romance'), setfilterGenre(false)}}>
                            <img src="https://justbooks.in/assets/images/categ-info/romance.svg" id="Romance" className="images"/>
                            <label>Romance</label>
                        </div>
                        <div className="label Novel" onClick={() => {setGenre('Novel'), setfilterGenre(false)}}> 
                            <img src="https://justbooks.in/assets/images/categ-info/classics.svg" id="Novel" className="images"/>
                            <label >Novel</label>
                        </div>
                        <div className="label Fiction" onClick={() => {setGenre('Fiction'), setfilterGenre(false)}}> 
                            <img src="https://wfiljmekszmbpzaqaxys.supabase.co/storage/v1/object/public/images/fiction.png?t=2024-05-28T09%3A10%3A56.968Z" id="Fiction" className="images"/>
                            <label>Fiction</label>
                        </div>
                        <div className="label Science" onClick={() => {setGenre('Science'), setfilterGenre(false)}}> 
                            <img src="https://justbooks.in/assets/images/categ-info/science.svg" id="Science" className="images"/>
                            <label>Science</label>
                        </div>
                        <div className="label Self-Help" onClick={() => {setGenre('Self-Help'), setfilterGenre(false)}}> 
                            <img src="https://justbooks.in/assets/images/categ-info/knowledge.svg" id="Self-Help" className="images"/>
                            <label >Self-Help</label>
                        </div>
                        <div className="label Manga" onClick={() => {setGenre('Manga'), setfilterGenre(false)}}> 
                            <img src="https://justbooks.in/assets/images/categ-info/comics.svg" style={{height: "50px"}} id="Manga" className="images"/>
                            <label>Manga</label>
                        </div>
                    </div>
                </div>
            </div>
            <DisplayBooks Genre={genre} filterGenre={filterGenre} setfilterGenre={setfilterGenre}/>
        </div>
        <Link to ='/uploadEbooks'><button id="PostBox">POST ITEM</button></Link>
        </>
    );
}