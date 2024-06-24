import { useEffect, useState } from "react";
import UserHook from '../Supabase/UserSessionData';
import supabase from '../Supabase/Supabase';

export default function usefetchMessageTab(){

    const [messageData, setMessage] = useState([]);
    const {user, _, __} = UserHook();

    useEffect(() =>{
        const fetchMessage = async () =>{
            const {data, error} = await supabase.from('unread_messages')
            .select()
            .eq('receiver_name',user.account_name)

            if(error){
                console.log("no messages");
            }else{
                setMessage(data);
                console.log(data)
            }
        }
        fetchMessage();
    },[user])


    const sendMessage = async (sender_name, enterMessage) =>{
        const {data, error} = await supabase.from('messages')
        .insert({
            content: enterMessage,
            sender_name: user.account_name,
            receiver_name: sender_name
        });
    }

    return { messageData, sendMessage };
}