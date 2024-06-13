import supabase from '../Supabase';
import '../styles/book.css'
import BookDetails from './BookDetails';
import BookHook from './BooksHook'
import useBookData from './BooksDataHook'


function DisplayBooks() {
    const { bookData, loading } = useBookData(); // Using the hook to get bookData and loading state
    const { passDets, bookDets, DisplayDets } = BookHook();

    return (
        <>
            {!bookDets ? (
                <div id="BookSection">
                    <button id="Booksec-back">X Exit</button>
                    <div className="LabelArea">
                        <span>Books</span>
                    </div>
                    <div className="FlexBooks">
                        <div className="BookArea">
                            <div className="Books-Column">
                                {loading ? ( 
                                    <div>Loading...</div>
                                ) : (
                                    bookData.map((genreData, idx) => (
                                        <div key={idx}>
                                            <h2>{genreData.genre}</h2>
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
                                        <input className="form-control" type="text" id="Book-Input"/>
                                    </div>
                                    <div className="col">
                                        <input className="form-control" type="text" id="Location-Input"/> {/*onclick="locationSuggest()"*/}
                                    </div>
                                    <div className="col1">
                                        <button className="btn" >SEARCH</button> {/*onclick="Search()"*/}
                                    </div>
                                </div>
                            </div>

                            <div className="Search-bar-suggest">
                                <div className="searchSuggest">
                                
                                </div>
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
                        <div className="label rom" > {/*onclick="genreSelect('Romance')"*/}
                            <img src="https://justbooks.in/assets/images/categ-info/romance.svg" id="Romance" className="images"/>
                            <label>Romance</label>
                        </div>
                        <div className="label nov"> {/*onclick="genreSelect('Novel')"*/}
                            <img src="https://justbooks.in/assets/images/categ-info/classics.svg" id="Novel" className="images"/>
                            <label >Novel</label>
                        </div>
                        <div className="label fic" > {/**onclick="genreSelect('Fiction')" */}
                            <img src="https://wfiljmekszmbpzaqaxys.supabase.co/storage/v1/object/public/images/fiction.png?t=2024-05-28T09%3A10%3A56.968Z" id="Fiction" className="images"/>
                            <label>Fiction</label>
                        </div>
                        <div className="label sci" > {/**onclick="genreSelect('Science')" */}
                            <img src="https://justbooks.in/assets/images/categ-info/science.svg" id="Science" className="images"/>
                            <label>Science</label>
                        </div>
                        <div className="label self" > {/**onclick="genreSelect('Science')" */}
                            <img src="https://justbooks.in/assets/images/categ-info/knowledge.svg" id="Self-Help" className="images"/>
                            <label >Self-Help</label>
                        </div>
                        <div className="label manga" > {/**onclick="genreSelect('Manga')" */}
                            <img src="https://justbooks.in/assets/images/categ-info/comics.svg" style={{height: "50px"}} id="Manga" className="images"/>
                            <label>Manga</label>
                        </div>
                    </div>
                </div>
            </div>
            <DisplayBooks/>
        </div>

        </>
    );
}
