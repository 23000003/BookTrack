import { useState, useEffect } from "react";
import supabase from "../Supabase/Supabase";

async function fetchBookTitles(type){
    
    const {data} = await supabase.from('books')
    .select('book_title')
    .eq('book_type', type)
    .eq('isApprove', true)

    return data;
}

async function fetchCities(type){

    const {data} = await supabase.from('books')
    .select('city')
    .eq('book_type', type)
    .eq('isApprove', true)

    return data
}

export default function SearchSuggest(props){

    const [bookTitle, setbookTitle] = useState([]);
    const [cityFound, setCityFound] = useState([]);
    const [foundSuggest, setFoundSuggest] = useState([]);
    const [foundCitySuggest, setCityFoundSuggest] = useState([])

    const {
        search, 
        setSearchPicked, 
        setSearchSuggest,
        type,
        searchTrigger,
        setSearchTrigger,
        citySuggest,
        setCitySuggest,
        setCityTrigger,
        citySearchTrigger,
        setCityPicked
    } = props

    console.log(search);

    useEffect(() => {
        const getBookData = async () => {
            try {
                const temp = await fetchBookTitles(type);
                setbookTitle(temp);
                const temp1 = await fetchCities(type);
                setCityFound(temp1)
                console.log("FOUND CITY",temp1);
            } catch (error) {
                console.error('Error fetching book titles:', error);
            }
        };
        getBookData();
    }, []);

    useEffect(() => {
        if(search === ''){
            setSearchTrigger(false)
            setFoundSuggest('')
        }else{
            const filteredTitles = bookTitle.filter(book =>
                book.book_title.toLowerCase().includes(search.toLowerCase())
            );
            setSearchTrigger(true);
            setFoundSuggest(filteredTitles);
        }
    }, [search, bookTitle]);

    useEffect(() => {
        if (citySuggest === '') {
            setCityTrigger(false);
            setCityFoundSuggest('')
        } else {
            
            const uniqueCities = new Set();
    
            cityFound.forEach(book => {
                if (book.city.toLowerCase().includes(citySuggest.toLowerCase())) {
                    uniqueCities.add(book.city); 
                }
            });
    
            const filteredCity = Array.from(uniqueCities);
            console.log(filteredCity)
            setCityTrigger(true);
            setCityFoundSuggest(filteredCity);
            console.log(foundCitySuggest)
            console.log(citySearchTrigger)
            console.log(foundCitySuggest.length)
        }
    }, [citySuggest, cityFound]);
    
    console.log("LEN",foundSuggest.length)

    return(
        <div className="Search-bar-suggest">
            {/* Applied correct calculation for height based on foundSuggest length, resetting to 0 if empty */}
            <div className="searchSuggest" 
                style={{
                    height: foundSuggest.length > 0 ? `${31 * foundSuggest.length}px` : '0px', 
                    backgroundColor: "white",
                    boxShadow: "0px 10px 25px -10px rgba(0,0,0,0.54)"
                }}>
                {searchTrigger && (
                    foundSuggest.map((title, index) => (
                        <p key={index}
                            onClick={() => {
                                setSearchPicked(title.book_title); 
                                setSearchTrigger(false);
                                setSearchSuggest('');
                            }}
                        >{title.book_title}</p>
                    ))
                )}      
            </div>

            {/* Applied correct calculation for height based on foundCitySuggest length, resetting to 0 if empty */}
            <div className="LocationSuggest"
                style={{
                    height: foundCitySuggest.length > 0 ? `${31 * foundCitySuggest.length}px` : '0px', 
                    backgroundColor: "white",
                    boxShadow: "0px 10px 25px -10px rgba(0,0,0,0.54)"
                }}>
                {citySearchTrigger && (
                    foundCitySuggest.map((title, index) => (
                        <p key={index}
                            onClick={() => {
                                setCityPicked(title)
                                setCityTrigger(false);
                                setCitySuggest('');
                            }}
                        >{title}</p>
                    ))
                )}
            </div> 
        </div>
    );
}
