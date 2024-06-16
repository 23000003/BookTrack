import supabase from '../Supabase';
import { useEffect, useState } from 'react';
import UserHook from "../LandingPage/UserHookData";

async function FetchBook(Tab, name){
    
    const {data, error} = await supabase.from(Tab)
    .select()
    .eq('account_name', name)

   return data;
}

export default function BooksUserTab(name){

    const [tabData, setTabData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [userTab, setUserTab] = useState(['Books_Sell', 'Books_Sold', 'History','In_Process']);

    useEffect(() =>{

        const fetchUserData = async () =>{
            setLoading(true);
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