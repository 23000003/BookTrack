import { useEffect, useState } from 'react';
import supabase from './Supabase';

export default function useFetchComponentsHook(tab, user) {
  const [eBooks, setEBooks] = useState([]);
  const [viewOrders, setViewOrders] = useState([]);
  useEffect(() => {
    
    const FetchEBooks = async () => {
      const { data, error } = await supabase
        .from('history')
        .select()
        .neq('file', null)
        .eq('account_name', user);

      if (error) {
        console.log(error);
      } else {
        setEBooks(data);
      }
    }

    const FetchViewOrders = async () => {
      const { data, error } = await supabase
        .from('transaction')
        .select(`
            transac_id,
            seller_name,
            buyer_name,
            full_name,
            quantity,
            price,
            location,
            ref_no,
            contact_no,
            book_id,
            order_type,
            accept,
            books(
                id,
                book_title,
                book_quantity,
                book_price,
                imagetag,
                in_process
            )
        `)
        .eq('buyer_name', user); // change this to seller_name

      if (error) {
        console.log(error);
        console.log("LMAO",user);
      } else {
        
        setViewOrders(data);
      }
    }

    switch(tab){
      case "EBooksTab":
        FetchEBooks();
        break;
      case "ViewOrders":
        FetchViewOrders();
        break;
    }
    
  }, []);

  return { 
    eBooks,
    viewOrders
  };
}