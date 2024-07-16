/*
THIS SELL TAB HOOK ACTS AS A HOOK TO PASS FUNCTIONS TO
THE MAIN COMPONENT "BookSelLTab"
*/

/** Real Time is lacking */

import { useRef, useState } from "react"
import supabase from "../Supabase/Supabase";


export default function useSellHook(ExitViewItem){
    
    const [itemName, setItemName] = useState('');
    const [itemPrice, setItemPrice] = useState('');
    const [itemQuantity, setItemQuantity] = useState();
    const [itemDescription, setItemDescription] = useState('');
    

    const ItemUpdate = async (data) =>{

        const {error:errorUpdate} = await supabase.from('books')
        .update({
            book_title: itemName === '' ? data.books.book_title : itemName,
            book_price: itemPrice === '' ? data.books.book_price : itemPrice,
            book_quantity: itemQuantity === '' ? data.books.book_quantity : itemQuantity,
            description: itemDescription === '' ? data.books.description : itemDescription
        }).eq('id', data.books.id);

        if(errorUpdate){
            alert("error updating books")
            console.log(errorUpdate)
        }else{
            alert("Update Successful!")
            ExitViewItem();
        }
    }

    const CancelandEditItem = (visibility, enableInput, style, bool) =>{
        visibility.current[0].current.style.visibility = style;
        visibility.current[1].current.style.visibility = style;
        enableInput.current[0].current.disabled = bool;
        enableInput.current[1].current.disabled = bool;
        enableInput.current[2].current.disabled = bool;
        enableInput.current[3].current.disabled = bool;

        if(bool === true){
            enableInput.current[0].current.value = "";
            enableInput.current[1].current.value = "";
            enableInput.current[2].current.value = "";
            enableInput.current[3].current.value = "";
    
        }
    }

    const ItemSold = async (data) =>{

        const {error: soldError} = await supabase.from('Books_Sold')
        .insert({
            id: data.book_id,
            book_title: data.books.book_title,
            account_name: data.books.account_name,
            book_price: data.books.book_price,
            imagetag: data.books.imagetag
        })


        if(soldError){
            alert("Error inserting")
            console.log(soldError)
        }
        else{
            const {error:sellError} = await supabase.from('Books_Sell')
            .delete()
            .eq('book_id', data.book_id)

            if(sellError){
                alert("Error deleting from sell")
                console.log(sellError)
            }else{
                const {error:bookError} = await supabase.from('books')
                .delete()
                .eq('id', data.book_id)
                
                if(bookError){
                    alert("Error deleting from books")
                    console.log(bookError)
                }else{
                    alert("tranfer successful!");
                    ExitViewItem();
                }
            }
        }

    }


    return { 
        CancelandEditItem, 
        ItemUpdate, 
        ItemSold,
        setItemName,
        setItemDescription,
        setItemQuantity,
        setItemPrice
    }

}