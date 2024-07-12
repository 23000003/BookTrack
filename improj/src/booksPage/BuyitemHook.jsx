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
            alert("ty")

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
                    price: totalPrice,
                    quantity: quantity
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
                    console.log(error);
                }

                const {error: accError} = await supabase
                .from('Accounts')
                .update({
                    notification: user.notification + 1
                })
                .eq('account_id', user.account_id);


                if(accError){
                    alert("error notif insert")
                    console.log(error);
                }
            }
            insert();
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

    return { 
        BuyItemTrigger,
        setReferenceNo,
        setFirstname,
        setLastName,
        setIsChecked,
        setContactNo,
        setLocation,
        AddtoFavourites,
        DeleteFavourites 
    };
}