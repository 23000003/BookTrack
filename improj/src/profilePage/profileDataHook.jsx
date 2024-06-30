import supabase from '../Supabase/Supabase';
import { useEffect, useState } from 'react';

export default function FetchBook(Tab, name){
    
    const [tabData, setTabData] = useState([]);
    const [loading, setLoading] = useState(true);
    console.log("Tab", Tab)
    console.log("user", name);

    useEffect(() => {
        const fetch = async () => {
            let data = [];
            let error = null;
            
            if (Tab === 'transaction') {
                ({ data, error } = await supabase.from(Tab)
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
                    .eq('buyer_name', name)
                );
            } else {
                ({ data, error } = await supabase.from(Tab)
                    .select()
                    .eq('account_name', name)
                );
            }
            
            if (error) {
                console.log(error);
            } else {
                if(data.length !== 0){
                    setTabData(data);
                    setLoading(false);
                }
            }
        }        
        fetch();
    }, [Tab, name]);
    
    return {tabData, loading};
}
