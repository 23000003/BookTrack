import { useState, useEffect } from "react";
import supabase from "../Supabase/Supabase";

async function fetchBookTitles(){
    
    const {data} = await supabase.from('books')
    .select('book_title'); 
    
    return data;
}

export default function SearchSuggest(props){

    const [bookTitle, setbookTitle] = useState([]);
    const [foundSuggest, setFoundSuggest] = useState([]);
    const [searchTrigger, setSearchTrigger] = useState(false);

    console.log(props.search);

    useEffect(() => {
        const getBookData = async () => {
            try {
                const temp = await fetchBookTitles();
                setbookTitle(temp);
            } catch (error) {
                console.error('Error fetching book titles:', error);
            }
        };
        getBookData();
    }, []);

    useEffect(() => {
        if(props.search === ''){
            setSearchTrigger(false)
        }else{
            const filteredTitles = bookTitle.filter(book =>
                book.book_title.toLowerCase().includes(props.search.toLowerCase())
            );
            setSearchTrigger(true);
            setFoundSuggest(filteredTitles);
        }
    }, [props.search, bookTitle]);


    return(
        <div className="searchSuggest" 
            style={{height: `31 * ${foundSuggest}px`, 
            backgroundColor: "white",
            boxShadow: "0px 10px 25px -10px rgba(0,0,0,0.54)"
        }}>
            {searchTrigger && (
                    foundSuggest.map((title, index) => (
                        <p key={index}>{title.book_title}</p>
                    ))
            )}      
        
        </div>
    );
}