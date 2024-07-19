import supabase from '../Supabase/Supabase';
import { useEffect, useState } from 'react';

export default function FetchBook(Tab, name, userID){
    // bug when order type is delivery
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
                        buyer_name(*),
                        full_name,
                        quantity,
                        price,
                        location,
                        ref_no,
                        contact_no,
                        book_id,
                        order_type,
                        accept,
                        books(*)
                    `)
                    .eq('buyer_name', userID)
                );
            } else if(Tab === 'books_sell'){
                ({ data, error } = await supabase.from(Tab)
                    .select(`
                        account_name,
                        books(
                            id,
                            book_title,
                            book_quantity,
                            book_price,
                            description,
                            imagetag,
                            in_process,
                            isApprove,
                            book_type
                        )
                    `)
                    .eq('account_name', name)
                );
            } else if ( Tab === 'history'){
                ({ data, error } = await supabase.from(Tab)
                    .select(`
                        buyer_name(*),
                        book_price,
                        isFailed,
                        books(
                            id,
                            book_title,
                            book_quantity,
                            book_price,
                            description,
                            imagetag,
                            book_type,
                            file
                        )
                    `)
                    .eq('buyer_name', userID)
                );
            } 
            else {
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
                }
                setLoading(false);
            }
        }
        if(name !== undefined){
            fetch();
        }
        console.log("NAMEEE",name)      
        
    }, [Tab, name]);
    
    return {tabData, loading};
}
