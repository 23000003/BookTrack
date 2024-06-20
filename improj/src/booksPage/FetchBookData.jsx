import supabase from '../Supabase';
import { useEffect, useState } from 'react';

async function booksDataFilter(CurrGenre) {

    const { data: booksData, error: booksError } = await supabase
    .from('Books')
    .select()
    .eq('book_genre', CurrGenre)
    .eq('book_type', 'physical');

    return booksData;
}

export default function useBookData() {
    const [genres, setGenres] = useState(['Novel', 'Romance', 'Fiction', 'Science', 'Self-Help', 'Manga']);
    const [bookData, setBookData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const allBookData = [];
            for (const genre of genres) {
                const data = await booksDataFilter(genre);
                allBookData.push({ genre, data });
            }
            setBookData(allBookData);
            setLoading(false);
        };
        fetchData();
    }, [genres]);

    return { bookData, loading };
}
