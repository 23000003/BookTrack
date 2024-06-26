import { useState } from "react";
import supabase from '../Supabase/Supabase'
import UserHook from "../Supabase/UserSessionData";

export default function useBuyItem(){

    const {user, _, __} = UserHook();

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

                const {data} = await supabase.from('transaction')
                .select()
                .eq('book_id', id)
                .single();           // Checks if item already exists in DB to update 
                                    // the quantity or insert the data
                console.log("Hey",data.quantity);
                if(data === null){ 
                    const {error: transacError} = await supabase
                    .from('transaction')
                    .insert({
                        book_id: id,
                        buyer_name: user.account_name,
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
                }else{
                    const {error: transacError} = await supabase
                    .from('transaction')
                    .update({
                        quantity: data.quantity + quantity,
                        price: data.price + totalPrice
                    })
                    if(transacError){
                        alert('error updating to transac');
                        console.log(transacError);
                    }
                }   
            }
            insert();
        }


    }

    return { 
        BuyItemTrigger,
        setReferenceNo,
        setFirstname,
        setLastName,
        setIsChecked,
        setContactNo,
        setLocation 
    };
}