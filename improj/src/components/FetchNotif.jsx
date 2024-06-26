import { useEffect, useState } from "react";
import supabase from "../Supabase/Supabase";
import UserHook from "../Supabase/UserSessionData";

export default function FetchNotif(){
    
    const { user } = UserHook();
    const [notifContent, setNotifContent] = useState([]);

    useEffect(() =>{
        const FetchContent = async () =>{
        
            try{
                
                const {data: buyer, error:buyerError} = await supabase
                .from('notification_contents')
                .select()
                .eq('buyer_name', user.account_name)
                
                console.log(user.account_name)

                if(buyerError){
                    alert('buyer error');
                    console.log(buyerError);
                    return;
                }
                
                const {data: seller, error: sellerError} = await supabase
                .from('notification_contents')
                .select()
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
    

    return { notifContent };
}