import { useEffect, useState } from "react";
import UserHook from '../Supabase/UserSessionData';
import supabase from '../Supabase/Supabase';
import { differenceInMilliseconds, formatDistance } from 'date-fns';

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
                return;
            }else{
                setMessage(data);
                console.log(data)
            }

            const {data:dataDate, error: errorDate} = await supabase
            .from('messages')
            .select('time_sent')
            .eq('receiver_name', user.account_name)
            .order('messageid', { ascending: false })
            .limit(1)
            .single()

            if(errorDate){
                console.log("fetching time error", errorDate)
            }else{
                console.log(dataDate.time_sent)
                const timestampDate = new Date(dataDate.time_sent);
                const currentDateTime = new Date();
                const elapsedMilliseconds = differenceInMilliseconds(currentDateTime, timestampDate);
                const elapsed = formatDistance(currentDateTime, timestampDate, { addSuffix: false });
                console.log("Time", elapsed);
                // this only fetches current of the database, 
                // make a logic of fetching its current time of every user in the databse 
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