import { useEffect, useState } from "react";
import supabase from "../Supabase/Supabase";
import UserHook from "../Supabase/UserSessionData";

export default function FetchNotif(){
    
    const { user } = UserHook();
    const [notifContent, setNotifContent] = useState([]);
    const [mapError, setMapError] = useState(true);

    useEffect(() =>{
        const FetchContent = async () =>{
            //Notif bug found
            try{
                
                const {data: buyer, error:buyerError} = await supabase
                .from('notification_contents')
                .select(`
                    notif_id,
                    book_id,
                    buyer_name,
                    seller_name,
                    time,
                    books(
                        book_title,
                        imagetag
                    )
                `)
                .eq('buyer_name', user.account_name)
                
                console.log(user.account_name)

                if(buyerError){
                    alert('buyer error');
                    console.log(buyerError);
                    return;
                }
                
                const {data: seller, error: sellerError} = await supabase
                .from('notification_contents')
                .select(`
                    notif_id,
                    book_id,
                    buyer_name,
                    seller_name,
                    time,
                    books(
                        book_title,
                        imagetag
                    )
                `)
                .eq('seller_name', user.account_name)
    
                if(sellerError){
                    alert('seller error');
                    console.log(sellerError);
                    return;
                }
    
                let combinedArray = [...buyer, ...seller];
                combinedArray.sort((a, b) => a.buyer - b.seller);
                setNotifContent(combinedArray);
                console.log("buyer", buyer)
                console.log("seller", seller)
                console.log("combined",combinedArray)
            }
            catch(error){
                console.error('Error in notif:', error.message);    
            }
            
        }
        FetchContent();
    },[user])
    
    const MarkAsRead = async () =>{
        
        const {error} = await supabase.from('Accounts')
        .update({
            notification: 0
        })
        .eq('account_id', user.account_id)

        if(error){
            console.log(error)
        }
        console.log(user.account_id)

        const {error:notif} = await supabase.from('notification_contents')
        .update({
            buyer_name: "read"
        })
        .eq('buyer_name', user.account_name)
        
        setMapError(false);
        console.log(notif)
        console.log(user.account_name)
        
    }

    return { notifContent, MarkAsRead, setNotifContent, mapError };
}