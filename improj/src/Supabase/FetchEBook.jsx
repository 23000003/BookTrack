import { useEffect, useState } from 'react';
import supabase from './Supabase';

export default function useFetchEBooks() {
  const [eBooks, setEBooks] = useState([]);

  useEffect(() => {
    const fetchEBooks = async () => {
      const { data, error } = await supabase
        .from('history')
        .select()
        .neq('file', null);

      if (error) {
        console.log(error);
      } else {
        setEBooks(data);
      }
    };

    fetchEBooks();
  }, []);

  return { eBooks };
}