import { useEffect, useState } from "react";
import supabase from "../Supabase/Supabase";

export default function useAdminView(){

    const [viewUsers, setViewUsers] = useState([]);
    const [viewUsersSell, setViewUsersSell] = useState([]);
    const [userBooksData, setUserData] = useState([]);

    useEffect(() => {
        const fetchUsersWithBooks = async () => {
            try {
                const { data: users, error: userError } = await supabase
                    .from('Accounts')
                    .select();

                if (userError) {
                    console.error('Error fetching users:', userError);
                    return;
                }

                const userPromises = users.map(async (user) => {
                    const { data: userBooks, error: booksError } = await supabase
                        .from('books')
                        .select()
                        .eq('account_name', user.account_name)
                        .eq('isApprove', true);

                    if (booksError) {
                        console.error(`Error fetching books for user ${user.account_name}:`, booksError);
                    }

                    return { user, books: userBooks || [] };
                });

                const usersWithBooksData = await Promise.all(userPromises);

                setViewUsers(usersWithBooksData);
            } catch (error) {
                console.error('Error:', error);
            }
        };

        fetchUsersWithBooks();
    }, []);
    
    const FetchViewUserSell = async (user) =>{
        const {data} = await supabase
        .from('books')
        .select()
        .eq('account_name', user)
        
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
        userBooksData,
    }
}