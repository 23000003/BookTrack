import supabase from "../Supabase/Supabase";
import { useEffect, useState } from "react";
import UserHook from "../Supabase/UserSessionData";

export default function useMessageContents(sender_name){
    const { user } = UserHook();
    const [content, setContent] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await supabase
                    .from('messages')
                    .select()
                    .eq('sender_name', sender_name || user.account_name);

                if (error) {
                    console.error('Error fetching messages:', error.message);
                } else {
                    setContent(data);
                    console.log('Fetched data:', data);
                }
            } catch (error) {
                console.error('Error in fetchData:', error.message);
            }
        };

        fetchData();
    }, [user.account_name]);

    console.log(user.account_name);
    console.log('Content state: 5', content);

    return { content };
}

