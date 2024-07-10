import supabase from "../Supabase/Supabase";
import { useEffect, useState } from "react";
import UserHook from "../Supabase/UserSessionData";

export default function useMessageContents(sender_name){
    const { user } = UserHook();
    const [content, setContent] = useState([]);
    const [senderPfp, setSenderPfp] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try{
                setLoading(true);
                const { data: sender, error: senderError } = await supabase
                    .from('messages')
                    .select()
                    .eq('sender_name', sender_name)
                    .eq('receiver_name', user.account_name);
                
                const {data: you, error: youError} = await supabase
                    .from('messages')
                    .select()
                    .eq('sender_name', user.account_name)
                    .eq('receiver_name', sender_name);
                
                if (youError || senderError) {
                    console.error('Error fetching messages:', error.message);
                }
                else{
                    // setContent();
                    if(sender.length === 0 && you.length === 0){
                        console.log('empty')
                    }else{

                        const {data} = await supabase
                        .from('Accounts')
                        .select('profile')
                        .eq('account_name', sender_name)
                        .single()
                        
                        setSenderPfp(data);

                        let combinedArray = [...sender, ...you];
                        combinedArray.sort((a, b) => a.messageid - b.messageid);
                        console.log('Fetched data:', sender);
                        console.log('Fetched data 2:', you);
                        console.log('Fetched data 2:', combinedArray);
                        setContent(combinedArray)
                    }
                    
                }
            }
            catch(error){
                console.error('Error in fetchData:', error.message);
            }
            setLoading(false);
        }

        fetchData();
    }, [sender_name, user.account_name]);

    console.log(user.account_name);
    console.log('Content state: 5', content);

    return { senderPfp, content, setContent, loading };
}

