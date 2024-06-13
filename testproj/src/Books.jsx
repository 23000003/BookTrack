import supabase from './Supabase';
import { useEffect, useState } from 'react';

async function booksDataFilter(genre){
    const {data:booksData, error: booksError} = await supabase
    .from('Books')
    .select()
    .eq('book_genre', genre);

    if(booksError){
        alert("Error Fetching Books Data");
        return;
    }

    return booksData;
} 

async function DisplayBooks(genre) {
    
    try {
        const booksData = await booksDataFilter(genre);

        if (!booksData) {
            return <p>No books available for {genre}</p>;
        }

        return (
            <>
            {booksData.map((book, index) => (
            
            <div className="first" key={index}>
                <span className="out-of-stock1"></span> 
                
                <span className="out-of-stock">
                    OUT OF STOCK
                </span> 

                <img src={book.imagetag} alt={book.book_title} />
                
                <div className="text">
                    <div className="titlediv">
                        <label>{book.book_title}</label>
                    </div>
                    <div className="price">
                        <p>{book.book_price}</p>
                    </div>
                    <span className="Buybutton">Buy</span>
                </div>

            </div>
            ))}
            </>
        );
    } 
    catch (error) {
        console.error('Error fetching books data:', error);
        return <p>Error fetching books data for {genre}</p>;
    }

    {/* <div className="bg"> 
    
            <!-- <div class="first">
            <span class="out-of-stock1">
    
            </span> 
            <span class="out-of-stock">
                OUT OF STOCK
            </span> 
            <img src="images/Bookbook.png" alt=""/>
            <div class="text">
                <div class="titlediv">
                    <label for="">LoremIpsumIpsumIpsum Lorem Ipsum Lorem Ipsum</label>
                </div>
                <div class="price">
                    <p>P350</p>
                </div>
                <span class="Buybutton">Buy</span>
            </div>
        </div> -->
        <!-- adds the html elements here from the JS script --> 
    </div> */}

}

export default function Books(){
    
    const [genres, genreState] = useState(['Novel', 'Fiction', 'Science',
                                            'Romance', 'Self-Help', 'Manga']);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const fetchedCards = await FetchCardData(level);
    //         setCards(fetchedCards);
    //     };
    //     fetchData();
    //     },[genres]); // if level is changed then add more cards

    useEffect(() => {
        const fetchData = async () => {
            for (const genre of genres) {
                const booksData = await booksDataFilter(genre);
            }
        };
        fetchData();
    }, [genres]);

    return(
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
                            <label for="Romance">Romance</label>
                        </div>
                        <div className="label nov"> {/*onclick="genreSelect('Novel')"*/}
                            <img src="https://justbooks.in/assets/images/categ-info/classics.svg" id="Novel" className="images"/>
                            <label for="Novel">Novel</label>
                        </div>
                        <div className="label fic" > {/**onclick="genreSelect('Fiction')" */}
                            <img src="https://wfiljmekszmbpzaqaxys.supabase.co/storage/v1/object/public/images/fiction.png?t=2024-05-28T09%3A10%3A56.968Z" id="Fiction" className="images"/>
                            <label for="Fiction">Fiction</label>
                        </div>
                        <div className="label sci" > {/**onclick="genreSelect('Science')" */}
                            <img src="https://justbooks.in/assets/images/categ-info/science.svg" id="Science" className="images"/>
                            <label for="Science">Science</label>
                        </div>
                        <div className="label self" > {/**onclick="genreSelect('Science')" */}
                            <img src="https://justbooks.in/assets/images/categ-info/knowledge.svg" id="Self-Help" className="images"/>
                            <label for="Self-Help">Self-Help</label>
                        </div>
                        <div className="label manga" > {/**onclick="genreSelect('Manga')" */}
                            <img src="https://justbooks.in/assets/images/categ-info/comics.svg" style={{height: "50px"}} id="Manga" className="images"/>
                            <label for="Manga">Manga</label>
                        </div>
                    </div>
                </div>
            </div>

            <div id="BookSection">
                <button id="Booksec-back">X Exit</button> {/**onclick="loadback()" */}
                <div className="LabelArea">
                    <span>Books</span>
                </div>
                <div className="FlexBooks">
                    <div className="BookArea">
                        {genres.map((genre, index) => (
                            <div className="Books-Column" key={index}>
                                <h2>{genre}</h2>
                                
                                <div className='bg'>
                                    {DisplayBooks(genre)}
                                </div>
                                
                                
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}