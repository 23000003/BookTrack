import { useEffect, useState } from "react";
import supabase from "../Supabase/Supabase";

export default function useAdminView(){

    const [viewUsers, setViewUsers] = useState([]);
    const [viewUsersSell, setViewUsersSell] = useState([]);
    const [userBooksData, setUserData] = useState([]);

    useEffect(() => {

        const FetchUser = async () =>{
            const {data} = await supabase
            .from('Accounts')
            .select()

            setViewUsers(data);
        }
        FetchUser();

    },[])
    
    const FetchViewUserSell = async (user) =>{
        const {data} = await supabase
        .from('books_sell')
        .select()
        .eq(user)
        
        setViewUsersSell(data);
    }

    const ViewUserItems = async(user) =>{
        const {data} = await supabase.from('books')
        .select()
        .eq('account_name', user)

        setUserData(data);
        console.log(data);
    }

    return {
        viewUsers,
        viewUsersSell,
        FetchViewUserSell,
        ViewUserItems,
        userBooksData
    }
}