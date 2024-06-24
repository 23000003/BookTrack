import { useState } from "react";
import supabase from '../Supabase/Supabase'

export default function useBuyItem(){

    const [referenceNo, setReferenceNo] = useState('');
    const [firstName, setFirstname] = useState('');
    const [lastName, setLastName] = useState('');
    const [isChecked, setIsChecked] = useState('pickup');
    const [contactNo, setContactNo] = useState('');
    const [location, setLocation] = useState('');

    const BuyItemTrigger = (quantity, current, id, in_process) => {
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
                const {error} = await supabase
                .from('books')
                .update({
                    in_process: quantity + in_process,
                    book_quantity: current - quantity
                })
                .eq('id', id)
            }
            update();
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