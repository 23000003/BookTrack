import { useState } from "react";
import supabase from '../Supabase/Supabase'
import UserHook from "../Supabase/UserSessionData";

export default function useBuyItem(){

    const {user} = UserHook();

    const [referenceNo, setReferenceNo] = useState('');
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastName] = useState('');
    const [isChecked, setIsChecked] = useState('pickup');
    const [contactNo, setContactNo] = useState('');
    const [location, setLocation] = useState('');

    const BuyItemTrigger = (quantity, current, id, in_process, seller, totalPrice) => {
        if(referenceNo === '' ||
            firstName === '' ||
            lastName === '' ||
            contactNo === '' ||
            (location === '' && isChecked === 'delivery')
        ){
            alert("dont leave a space empty")
            return;
        }else{

            const update = async () =>{
                const {error:bookError} = await supabase
                .from('books')
                .update({
                    in_process: quantity + in_process,
                    book_quantity: current - quantity
                })
                .eq('id', id)

                if(bookError){
                    console.log(bookError);
                    alert('Error buying (book error)')
                    return;
                }
            }
            update();
        

            const insert = async () =>{

                const {error: transacError} = await supabase
                .from('transaction')
                .insert({
                    book_id: id,
                    buyer_name: user.account_id,
                    seller_name: seller,
                    full_name: firstName + ' ' + lastName,
                    location: location,
                    contact_no: contactNo,
                    ref_no: referenceNo,
                    order_type: isChecked,
                    price: totalPrice + (isChecked === 'delivery' ? 50 : 0),
                    quantity: quantity
                })

                if(transacError){
                    alert('error inserting to transac');
                    console.log(transacError);
                }else{
                    TriggerAddNotif(id,seller);
                }
                
                
            }
            insert();
        }
    }

    const ViaCashOnDelivery = async (quantity, current, id, in_process, seller, totalPrice) =>{
        if(firstName === '' ||
            lastName === '' ||
            contactNo === '' ||
            location === ''
        ){
            alert("Input all fields");
            return;
        }
        else{
            const update = async () =>{
                const {error:bookError} = await supabase
                .from('books')
                .update({
                    in_process: quantity + in_process,
                    book_quantity: current - quantity
                })
                .eq('id', id)

                if(bookError){
                    console.log(bookError);
                    alert('Error buying (book error)')
                    return;
                }
            }
            update();

            const insert = async () =>{

                const {error: transacError} = await supabase
                .from('transaction')
                .insert({
                    book_id: id,
                    buyer_name: user.account_id,
                    seller_name: seller,
                    full_name: firstName + ' ' + lastName,
                    location: location,
                    contact_no: contactNo,
                    order_type: 'COD',
                    price: totalPrice + 50,
                    quantity: quantity
                })

                if(transacError){
                    alert('error inserting to transac');
                    console.log(transacError);
                }else{
                    TriggerAddNotif(id,seller);
                }
            }
            insert();
        }
    }

    const TriggerAddNotif = async(id, seller) =>{
        const {error: notifError} = await supabase
        .from('notification_contents')
        .insert({
            book_id: id,
            account_name: user.account_name,
            type: "Transaction"
        });

        const {error: notifError1} = await supabase
        .from('notification_contents')
        .insert({
            book_id: id,
            account_name: seller,
            type: "Bought"
        });

        if(notifError || notifError1){
            alert("error notif insert")
            console.log(error);
        }

        const {data: You} = await supabase
        .from('Accounts')
        .select()
        .eq('account_id', user.account_id)
        .single();

        const {error: accError} = await supabase
        .from('Accounts')
        .update({
            notification: You.notification + 1
        })
        .eq('account_id', user.account_id);

        if(accError){
            alert("error notif insert")
            console.log(accError);
            
        }
        else{
            const {data ,error: accError1} = await supabase
            .from('Accounts')
            .select()
            .eq('account_name', seller)
            .single();

            if(accError1){
                console.log(accError1)
            }else{
                const {error: accError2} = await supabase
                .from('Accounts')
                .update({
                    notification: data.notification + 1
                })
                .eq('account_name', seller);

                if(accError2){
                    console.log(accError2)
                }else{
                    alert("bought successful")
                }
            }
        }
    }

    const AddtoFavourites = async(id) =>{
        const {error} = await supabase.from('favourites')
        .insert({
            book_id: id,
            account_name: user.account_name
        })

        if(error){
            console.log(error);
        }else{
            alert("added to favourites")
        }
    }

    const DeleteFavourites = async(id) =>{
        const {error} = await supabase.from('favourites')
        .delete()
        .eq('book_id', id)
        .eq('account_name', user.account_name)

        if(error){
            console.log(error);
        }else{
            alert('Deleted from favourites')
        }
    }

    const BuyEbookTrigger = async(id, seller, totalPrice) =>{

        if( referenceNo === '' ||
            firstName === '' ||
            lastName === '' ||
            contactNo === '' ){

            alert("Input fields")
            return;
        }
        else{
            const {error: transacError} = await supabase
            .from('transaction')
            .insert({
                book_id: id,
                buyer_name: user.account_id,
                seller_name: seller,
                full_name: firstName + ' ' + lastName,
                contact_no: contactNo,
                ref_no: referenceNo,
                price: totalPrice
            })
    
            if(transacError){
                alert('error inserting to transac');
                console.log(transacError);
            }
            
            const {error: notifError} = await supabase
            .from('notification_contents')
            .insert({
                book_id: id,
                account_name: user.account_name,
                type: "Transaction"
            });
    
            const {error: notifError1} = await supabase
            .from('notification_contents')
            .insert({
                book_id: id,
                account_name: seller,
                type: "Bought"
            });
    
            if(notifError || notifError1){
                alert("error notif insert")
                console.log(notifError);
                console.log(notifError1)
            }
    
            const {error: accError} = await supabase
            .from('Accounts')
            .update({
                notification: user.notification + 1
            })
            .eq('account_id', user.account_id);

            if(accError){
                alert("error notif insert")
                console.log(accError);
                
            }
            else{
                const {data ,error: accError1} = await supabase
                .from('Accounts')
                .select()
                .eq('account_name', seller)
                .single();

                if(accError1){
                    console.log(accError1)
                }
                else{
                    const {error: accError2} = await supabase
                    .from('Accounts')
                    .update({
                        notification: data.notification + 1
                    })
                    .eq('account_name', seller);

                    if(accError2){
                        console.log(accError2)
                    }else{
                        alert("bought successful")
                    }
                }
            }
        }
        
    }

    return { 
        BuyItemTrigger,
        setReferenceNo,
        setFirstname,
        setLastName,
        setIsChecked,
        setContactNo,
        setLocation,
        AddtoFavourites,
        DeleteFavourites,
        BuyEbookTrigger,
        ViaCashOnDelivery 
    };
}