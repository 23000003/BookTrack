import { useState, useEffect } from "react";
import supabase from "../Supabase/Supabase";

async function fetchBookTitles(type){
    
    const {data} = await supabase.from('books')
    .select('book_title')
    .eq('book_type', type)

    return data;
}

export default function SearchSuggest({search, setSearchPicked, setSearchSuggest, type}){

    const [bookTitle, setbookTitle] = useState([]);
    const [foundSuggest, setFoundSuggest] = useState([]);
    const [searchTrigger, setSearchTrigger] = useState(false);

    console.log(search);

    useEffect(() => {
        const getBookData = async () => {
            try {
                const temp = await fetchBookTitles(type);
                setbookTitle(temp);
            } catch (error) {
                console.error('Error fetching book titles:', error);
            }
        };
        getBookData();
    }, []);

    useEffect(() => {
        if(search === ''){
            setSearchTrigger(false)
        }else{
            const filteredTitles = bookTitle.filter(book =>
                book.book_title.toLowerCase().includes(search.toLowerCase())
            );
            setSearchTrigger(true);
            setFoundSuggest(filteredTitles);
        }
    }, [search, bookTitle]);


    return(
        <div className="Search-bar-suggest">
            <div className="searchSuggest" 
                style={{height: `31 * ${foundSuggest}px`, 
                backgroundColor: "white",
                boxShadow: "0px 10px 25px -10px rgba(0,0,0,0.54)"
            }}>
                {searchTrigger && (
                    foundSuggest.map((title, index) => (
                        <p key={index}
                            onClick={() => {
                                setSearchPicked(title.book_title), 
                                setSearchTrigger(false),
                                setSearchSuggest('')
                            }}
                        >{title.book_title}</p>
                    ))
                )}      
            </div>
            <div class="LocationSuggest">
                                
            </div> 
        </div>
    );
}