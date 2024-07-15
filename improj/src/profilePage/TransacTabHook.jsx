import supabase from "../Supabase/Supabase";

// async function FetchBook(id){

//     const {data, error} = await supabase.from('books')
//     .select()
//     .eq('id', id)
//     .single()

//     if(error){
//         console.log(error);
//     }else{
//         return data;
//     }

// }


export default function useTransacHook(){


    const ItemNotClaimed = async (data) =>{
        const {error} = await supabase.from('transaction')
        .delete()
        .eq('transac_id', data.transac_id)

        if(error){
            console.log(error)
        }else{

            const {error: processError} = await supabase.from('books')
            .update({
                book_quantity: data.books.book_quantity + data.quantity,
                in_process: data.books.in_process - data.quantity
            })
            .eq('id', data.book_id) 

            if(processError){
                console.log(processError)
            }else{
                alert("Item not claimed Successful")
            }
        }
        
    }

    const ItemClaimed = async (data) => {

        const {error:errorHistory} = await supabase.from('history')
        .insert({
            book_title: data.books.book_title,
            account_name: data.buyer_name.account_name,
            book_id: data.books.id,
            book_price: data.price
        })
        
        if(errorHistory){
            console.log(errorHistory)
            alert("Error inserting")
        }
        else{

            const {error: processError} = await supabase.from('books')
            .update({
                in_process: data.books.in_process - data.quantity
            })
            .eq('id', data.book_id) 

            if(processError){
                console.log(processError)
                alert("Error update")
                return;
            }

            const {error} = await supabase.from('transaction')
            .delete()
            .eq('transac_id', data.transac_id)
            
            if(error){
                console.log(error);
                alert("error deleting")
            }else{
                alert("ItemClaimed Successful")
            }
        }
        
    }

    return { ItemNotClaimed, ItemClaimed }
}