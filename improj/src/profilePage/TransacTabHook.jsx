import supabase from "../Supabase/Supabase";


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
            book_id: data.books.id,
            buyer_name: data.buyer_name.account_id,
            seller_name: data.books.account_name,
            book_price: data.price,
            isFailed: false
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
                window.location.reload();
            }
        }
        
    }

    return { ItemNotClaimed, ItemClaimed }
}