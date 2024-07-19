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
                buyer_name(*),
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
            .eq('buyer_name', user);


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
                    account_id,
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
            .eq('seller_name', user)
            .order('date_ordered', { ascending: true }); 

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


    const DeclineOrder = async (data, type) =>{

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
            const { error: errorHistory } = await supabase.from('history')
            .insert({
                book_id: data.books.id,
                buyer_name: data.buyer_name.account_id,
                seller_name: (type === 'Decline' ? '' : user),
                book_price: data.price,
                isFailed: true
            });
        
            const {error} = await supabase.from('transaction')
            .delete()
            .eq('transac_id', data.transac_id)
    
            if(error){
                console.log(error)
                
            }else{
                UpdateNotification(
                    data.books.id,
                    data.buyer_name.account_name,
                    type
                )
            }
            console.log(data);
        }
        
    }

    const ApproveOrder = async (data) =>{
        const {error} = await supabase.from('transaction')
        .update({
            accept: true
        })
        .eq('transac_id', data.transac_id)

        if(error){
            console.log(error)
        }else{
            UpdateNotification(
                data.books.id,
                data.buyer_name.account_name,
                "Approve"
            )
        }
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
    
    const UpdateNotification = async(id, sendTo, type) => {
        const {error: notifError} = await supabase
        .from('notification_contents')
        .insert({
            book_id: id,
            account_name: sendTo,
            type: type
        });

        if(notifError){
            console.log(notifError)
            return;
        }

        const {data} = await supabase.from('Accounts')
        .select('notification')
        .eq('account_name', sendTo)
        .single()

        const {error: updateNotif} = await supabase.from('Accounts')
        .update({
            notification: data.notification + 1,
        }).eq('account_name', sendTo);
        
        if(updateNotif){
            console.log(updateNotif)
        }else{
            alert(type)
            window.location.reload();
        }
    }

    const CancelOrder = async (data) =>{
        
    }

    const Release = async(data) =>{
        
        const {error:errorHistory} = await supabase.from('history')
        .insert({
            book_id: data.books.id,
            buyer_name: data.buyer_name.account_id,
            seller_name: user,
            book_price: data.price,
            type: "e-book",
            isFailed: false
        })
        
        if(errorHistory){
            console.log(errorHistory)
            return;
        }

        const {error: deleteTransac} = await supabase.from('transaction')
        .delete()
        .eq('transac_id', data.transac_id)

        UpdateNotification(
            data.books.id,
            data.buyer_name.account_name,
            "Release"
        )
        alert(data)
        
    }

    const DontRelease = async (data) =>{
        const {error: deleteTransac} = await supabase.from('transaction')
        .delete()
        .eq('transac_id', data.transac_id)

        UpdateNotification(
            data.books.id,
            data.buyer_name.account_name,
            "Dont-Release"
        )
    }

    const ConfirmButtonFunc = (data, type) => {
        switch(type){
            case 'Dont-Release':
                DontRelease(data);
                break;
            case 'Release':
                Release(data);
                break;
            case 'Order-Canceled':
                DeclineOrder(data, "Order-Canceled")
                break;
            case 'Approve':
                ApproveOrder(data)
                break;
            case 'Decline':
                DeclineOrder(data, "Decline")
                break;
            default:
                alert("Invalid Type")
                break;
        }
    }

    return { 
        eBooks,
        viewOrders,
        DeclineOrder,
        ApproveOrder,
        CancelOrder,
        Release,
        setMessageContent,
        triggerMessage,
        setTriggerMessage,
        messageRef,
        SendMessageFunc,
        DontRelease,
        UpdateNotification,
        ConfirmButtonFunc
    };
}