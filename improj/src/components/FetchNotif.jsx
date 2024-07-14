import { useEffect, useState } from "react";
import supabase from "../Supabase/Supabase";
import UserHook from "../Supabase/UserSessionData";

export default function FetchNotif(){ // Will try to pass this to  UserSessionData to prevent more rendering
    
    const { user } = UserHook();
    const [notifContent, setNotifContent] = useState([]);
    const [mapError, setMapError] = useState(true);
    const [refetch, setRefetch] = useState(false);
    const [readLoading, setReadLoading] = useState(false);

    useEffect(() =>{
        const FetchContent = async () =>{
            //Notif bug found
            try{
                
                const {data: notifUser, error:notifError} = await supabase
                .from('notification_contents')
                .select(`
                    notif_id,
                    book_id,
                    account_name,
                    type,
                    time,
                    books(
                        book_title,
                        imagetag
                    )
                `)
                .eq('account_name', user.account_name)
                
                console.log(user.account_name)

                if(notifError){
                    alert('buyer error');
                    console.log(notifError);
                    throw buyerError
                }else{
                    setNotifContent(notifUser)
                    setRefetch(false);
                    console.log("GEIJ", user.notification)
                }
            
            }
            catch(error){
                console.error('Error in notif:', error.message);    
                return
            }
            
        }
        FetchContent();
    },[user, refetch])
    
    const MarkAsRead = async () =>{
        setReadLoading(true);

        const {error} = await supabase.from('Accounts')
        .update({
            notification: 0
        })
        .eq('account_id', user.account_id)

        if(error){
            console.log(error)
            return;
        }
        console.log(user.account_id)

        const {error:notif} = await supabase.from('notification_contents')
        .delete()
        .eq('account_name', user.account_name)
        
        setMapError(false);
        console.log(notif)
        console.log(user.account_name)
        setReadLoading(false);
        
    }

    return { notifContent, MarkAsRead, setNotifContent, mapError, setRefetch, readLoading};
}