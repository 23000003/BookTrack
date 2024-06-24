import supabase from '../Supabase/Supabase';
import { useEffect, useState } from 'react';

async function FetchBook(Tab, name){
    
    if(Tab === 'transaction'){
        const {data, error} = await supabase.from(Tab)
        .select((`
            transac_id,
            seller_name,
            buyer_name,
            full_name,
            location,
            ref_no,
            contact_no,
            book_id,
            books(
                id,
                book_title,
                book_price,
                imagetag,
                in_process
            )
        `))
        .eq('buyer_name', name)

        return data;
    }else{
        const {data, error} = await supabase.from(Tab)
        .select()
        .eq('account_name', name)

        return data;
    }
    
}

export default function BooksUserTab(name){

    const [tabData, setTabData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userTab, setUserTab] = useState(['Books_Sell', 'Books_Sold', 'History','transaction']);

    useEffect(() =>{

        const fetchUserData = async () =>{
            let allBookData = [];

            for (const tab of userTab) {
                const tempdata = await FetchBook(tab, name);
                allBookData.push({ tab, tempdata });
            }

            setTabData(allBookData);
            setLoading(false);
        }
        fetchUserData();
    },[userTab, name]);

    return {tabData, loading}
}