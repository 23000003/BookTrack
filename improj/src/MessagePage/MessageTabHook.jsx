import { useEffect, useState } from "react";
import UserHook from '../Supabase/UserSessionData';
import supabase from '../Supabase/Supabase';
import { differenceInMilliseconds, formatDistance } from 'date-fns';

export default function usefetchMessageTab(){

    const [messageData, setMessage] = useState([]);
    const {user, _, __} = UserHook();

    useEffect(() => {
        const fetchMessages = async () => {
            let temp = [];
            const { data: unreadMessages, error } = await supabase
                .from('unread_messages')
                .select()
                .eq('receiver_name', user.account_name)
                .order('time_sent', { ascending: false });
    
            if (error) {
                console.log("No messages");
                return;
            } else {
                for (const message of unreadMessages) {
                    const { data: profileData } = await supabase
                        .from('Accounts')
                        .select('profile')
                        .eq('account_name', message.sender_name)
                        .single();
                    
                    temp.push({ profile: profileData.profile, ...message });
                }
                
                setMessage(temp);
                console.log(messageData)
            }
        };
        
        fetchMessages();
    }, [user]);


    const sendMessage = async (sender_name, enterMessage) =>{
        const {data, error} = await supabase.from('messages')
        .insert({
            content: enterMessage,
            sender_name: user.account_name,
            receiver_name: sender_name
        });

        const {data: notifReceiver} = await supabase.from('unread_messages')
        .select()
        .eq('receiver_name', sender_name)
        .eq('sender_name', user.account_name);

        console.log("notifreceiver", notifReceiver)

        const {data: unread, error: unreadError} = await supabase.from('unread_messages')
        .update({
            time_sent: new Date().toISOString(),
            receiver_notif: notifReceiver[0].receiver_notif + 1
        })
        .eq('receiver_name', sender_name)
        .eq('sender_name', user.account_name);

        if(unreadError){
            console.log(unreadError);
        }
    }

    return { messageData, sendMessage, setMessage };
}