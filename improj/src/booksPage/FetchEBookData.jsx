import supabase from '../Supabase/Supabase';
import { useEffect, useState } from 'react';

async function EbooksDataFilter(CurrGenre) {

    if(CurrGenre === "Others"){

        const { data: booksData, error: booksError } = await supabase
        .from('books')
        .select()
        .neq('book_genre', 'Novel')
        .neq('book_genre', 'Romance')
        .neq('book_genre','Fiction')
        .neq('book_genre', 'Science')
        .neq('book_genre', 'Self-Help')
        .neq('book_genre', 'Manga')
        .eq('book_type', 'e-book')
        .eq('isApprove', true);

        return booksData;
    }
    else{
        const { data: booksData, error: booksError } = await supabase
        .from('books')
        .select()
        .eq('book_genre', CurrGenre)
        .eq('book_type', 'e-book');

        return booksData;
    }
    
}

export default function useEBookData() {
    const [genres, setGenres] = useState(['Novel', 'Romance', 'Fiction', 'Science', 'Self-Help', 'Manga', 'Others']);
    const [ebookData, setEBookData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const allBookData = [];
            for (const genre of genres) {
                const data = await EbooksDataFilter(genre);
                allBookData.push({ genre, data });
            }
            setEBookData(allBookData);
            setLoading(false);
        };
        fetchData();
    }, [genres]);

    return { ebookData, loading };
}
