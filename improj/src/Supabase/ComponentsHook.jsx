import { useEffect, useState, useRef } from 'react';
import supabase from './Supabase';

export default function useFetchComponentsHook(tab, user) {
    const [eBooks, setEBooks] = useState([]);
    const [viewOrders, setViewOrders] = useState([]);
  
    useEffect(() => {
    
        const FetchEBooks = async () => {
            const { data, error } = await supabase
            .from('history')
            .select(`
                account_name,
                book_price,
                books (
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
            .eq('type', 'e-book')
            .eq('account_name', user);


            if (error) {
                console.log(error);
            } else {
                setEBooks(data);
                console.log(user)
            }
        }

        const FetchViewOrders = async () => {
        const { data, error } = await supabase
            .from('transaction')
            .select(`
                transac_id,
                seller_name,
                buyer_name(
                account_name,
                email,
                profile
                ),
                full_name,
                quantity,
                price,
                location,
                ref_no,
                contact_no,
                book_id,
                order_type,
                accept,
                date_ordered,
                books(
                    id,
                    book_title,
                    book_quantity,
                    book_price,
                    imagetag,
                    in_process,
                    book_type
                )
            `)
            .eq('seller_name', user); // change this to seller_name

            if (error) {
                console.log(error);
            } else {
                console.log("LMAO",user);
                setViewOrders(data);
            }
        }

        switch(tab){
            case "EBooksTab":
                FetchEBooks();
                break;
            case "ViewOrders":
                FetchViewOrders();
                break;
        }
        
  }, []);


    const DeclineOrder = async (data) =>{

        const {error: processError} = await supabase.from('books')
        .update({
            book_quantity: data.books.book_quantity + data.quantity,
            in_process: data.books.in_process - data.quantity
        })
        .eq('id', data.book_id)
        
        if(processError){
            console.log(error)
        }
        else{
            const {error} = await supabase.from('transaction')
            .delete()
            .eq('transac_id', data.transac_id)
    
            if(error){
                console.log(error)
                
            }else{
                alert("Decline success")
            }
            console.log(data);
        }
        
    }

    const ApproveOrder = async (id) =>{
        const {error} = await supabase.from('transaction')
        .update({
            accept: true
        })
        .eq('transac_id', id)

        if(error){
            console.log(error)
        }else{
            alert("Approve Success");
        }
    }

    const NotSent = async (data) =>{

    }

    const Sent = async() =>{

    }

    const [messageContent, setMessageContent] = useState('');
    const [triggerMessage, setTriggerMessage] = useState(false);
    const messageRef = useRef(null)

    const SendMessageFunc = async (receiver_user) =>{
    
        //put Loading
        const {error: messageError} = await supabase
        .from('messages')
        .insert({
            content: messageContent,
            receiver_name: receiver_user,
            sender_name: user
        })

        if(messageError){
            alert("error inserting")
            console.log(error);
        }
        else{
            const {data} = await supabase
            .from('unread_messages')
            .select()
            .eq('sender_name', user)
            .eq('receiver_name', receiver_user)
            .single()

            console.log(data)

            if(data === null){
                const {error:insertUnread} = await supabase
                .from('unread_messages')
                .insert({
                    receiver_notif: 0,
                    sender_name: user,
                    receiver_name: receiver_user
                })

                const {error:insertUnread2} = await supabase
                .from('unread_messages')
                .insert({
                    receiver_notif: 1,
                    sender_name: receiver_user,
                    receiver_name: user
                })
                if(insertUnread || insertUnread2){
                    alert("error inserting")
                    console.log(error);
                }else{
                    alert("Message sent");
                }
            }
            else{
                const {error:updateUnread} = await supabase
                .from('unread_messages')
                .update({
                    receiver_notif: data.receiver_notif + 1,
                })
                .eq('sender_name', user)
                .eq('receiver_name', receiver_user)

                if(updateUnread){
                    alert("error inserting")
                    console.log(error);
                }else{
                    alert("Message W Sent")
                }
            }
        }
    }

    return { 
        eBooks,
        viewOrders,
        DeclineOrder,
        ApproveOrder,
        NotSent,
        Sent,
        setMessageContent,
        triggerMessage,
        setTriggerMessage,
        messageRef,
        SendMessageFunc
    };
}