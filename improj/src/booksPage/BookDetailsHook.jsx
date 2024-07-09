import { useState, useRef } from "react";
import UserHook from "../Supabase/UserSessionData";
import supabase from "../Supabase/Supabase";

export default function useBookDetailsHook(passDets){

    const [Payment, PaymentState] = useState(false);
    const [top, setTop] = useState('20%');
    const [height, setHeight] = useState('200px');
    const [Choose, SetChoose] = useState(true);
    const [PaymentMethod, SetPaymentMethod] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [totalPrice, setTotalPrice] = useState(passDets.book_price);
    const [triggerMessage, setTriggerMessage] = useState(false);
    const [messageContent, setMessageContent] = useState('');
    
    const pickupRef = useRef(null);
    const deliveryRef = useRef(null);
    const refLoc = useRef(null);
    const messageRef = useRef(null)

    const {user} = UserHook();

    const handlePickupChange = () => {
        if (pickupRef.current.checked) {
            setIsChecked('pickup')
            deliveryRef.current.checked = false;
            refLoc.current.disabled = true;
        }
    };
    
    const handleDeliveryChange = () => {
        if (deliveryRef.current.checked) {
            pickupRef.current.checked = false;
            setIsChecked('delivery')
            refLoc.current.disabled = false;
        }
    };

    const QuantityAdd = () =>{
        if(quantity < passDets.book_quantity){
            setQuantity(quantity => quantity + 1);
            setTotalPrice(totalPrice => totalPrice + passDets.book_price);
        }
    }

    const QuantityMinus = () =>{
        if(quantity !== 1){
            setQuantity(quantity => quantity - 1);
            setTotalPrice(totalPrice => totalPrice - passDets.book_price);
        }
    }

    const gcashMethod = () =>{
        SetPaymentMethod('Gcash');
        SetChoose(false);
        setHeight('730px')
        setTop('33.4%')
    }

    const CashOnDelivery = () =>{
        SetPaymentMethod('COD');
        SetChoose(false);
        setHeight('370px')
        setTop('25.4%')
    }

    const paymentTrigger = () =>{
        PaymentState(!Payment);
        document.body.style.overflow = 'hidden';
    }

    const returnBackDisplay = () =>{
        PaymentState(false);
        setTop('20%');
        setHeight('200px');
        SetChoose(true);
        SetPaymentMethod();
        document.body.style.overflow = 'auto';
    }

    const SendMessageFunc = async (receiver_user) =>{
        
        //put Loading
        const {error: messageError} = await supabase
        .from('messages')
        .insert({
            content: messageContent,
            receiver_name: receiver_user,
            sender_name: user.account_name
        })

        if(messageError){
            alert("error inserting")
            console.log(error);
        }
        else{
            const {data} = await supabase
            .from('unread_messages')
            .select()
            .eq('sender_name', user.account_name)
            .eq('receiver_name', receiver_user)
            .single()

            console.log(data)

            if(data === null){
                const {error:insertUnread} = await supabase
                .from('unread_messages')
                .insert({
                    receiver_notif: 0,
                    sender_name: user.account_name,
                    receiver_name: receiver_user
                })

                const {error:insertUnread2} = await supabase
                .from('unread_messages')
                .insert({
                    receiver_notif: 1,
                    sender_name: receiver_user,
                    receiver_name: user.account_name
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
                .eq('sender_name', user.account_name)
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

    return{
        handlePickupChange,
        handleDeliveryChange,
        QuantityAdd,
        QuantityMinus,
        gcashMethod,
        CashOnDelivery,
        paymentTrigger,
        returnBackDisplay,
        Payment,
        top,
        height,
        Choose,
        PaymentMethod,
        quantity,
        totalPrice,
        triggerMessage,
        setQuantity,
        setTotalPrice,
        setTriggerMessage,
        pickupRef,
        deliveryRef,
        refLoc,
        messageRef,
        setMessageContent,
        SendMessageFunc
    }
}