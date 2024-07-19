import '../styles/book.css'
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchSuggest from './SearchSuggest';
import BooksDisplay from './Books'
import UserHook from '../Supabase/UserSessionData';

export default function LandingBooks(){

    const {user} = UserHook()
    const [genre, setGenre] = useState('');
    const [filterGenre, setfilterGenre] = useState(true);
    const [searchSuggest, setSearchSuggest] = useState('');
    const [citySuggest, setCitySuggest] = useState('');
    const [searchPicked, setSearchPicked] = useState('');
    const [searchTrigger, setSearchTrigger] = useState(false);
    const [citySearchTrigger, setCityTrigger] = useState(false);
    const [cityPicked, setCityPicked] = useState('');
    const navigate = useNavigate();

    console.log(searchSuggest);
    console.log(searchPicked);
    console.log(user)
    return(
        <>
        <div className='container'>
            <div className='background-search'>
                <div className="background-search">
                    <div className="background-search2">
                        <div className="search-bar">
                            <h3 style={{display: "flex"}}>Search Your Favourite Book!</h3>
                            
                            <div className="form" style={{zIndex: "5"}}>
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
                                            placeholder='Enter A City...'
                                            value={citySuggest}
                                            onChange={(e) => setCitySuggest(e.target.value)}
                                        />
                                    </div>
                                    <div className="col1">
                                        <button className="btn">SEARCH</button> {/*onclick="Search()"*/}
                                    </div>
                                </div>
                            </div>
                            
                            <SearchSuggest 
                                search={searchSuggest}
                                setSearchSuggest = {setSearchSuggest}
                                citySuggest = {citySuggest}
                                setCitySuggest = {setCitySuggest}
                                setSearchPicked={setSearchPicked}
                                searchTrigger = {searchTrigger}
                                setSearchTrigger = {setSearchTrigger}
                                citySearchTrigger = {citySearchTrigger}
                                setCityTrigger = {setCityTrigger}
                                setCityPicked = {setCityPicked}
                                type = "physical"
                            />
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
                        <div className="label Manga Others" onClick={() => {setGenre('Others'), setfilterGenre(false)}}> 
                            <img src="https://justbooks.in/assets/images/categ-info/technical.svg" style={{height: "50px"}} id="Manga" className="images"/>
                            <label>Others</label>
                        </div>
                    </div>
                </div>
            </div>
            
            <BooksDisplay 
                Genre={genre} 
                filterGenre={filterGenre} 
                setfilterGenre={setfilterGenre}
                searchPicked = {searchPicked}
                setSearchPicked = {setSearchPicked}
                cityPicked = {cityPicked}
                type = "physical"
            />
        </div>
        {user.length !== 0 &&(<Link to ='/uploadBooks'><button id="PostBox">POST ITEM</button></Link>)}
        </>
    );
}