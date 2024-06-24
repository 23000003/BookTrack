import supabase from '../Supabase/Supabase';
import { useEffect, useState } from 'react';

async function EbooksDataFilter(CurrGenre) {

    const { data: booksData, error: booksError } = await supabase
    .from('books')
    .select()
    .eq('book_genre', CurrGenre)
    .eq('book_type', 'e-book');
    
    return booksData;
}

export default function useEBookData() {
    const [genres, setGenres] = useState(['Novel', 'Romance', 'Fiction', 'Science', 'Self-Help', 'Manga']);
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
