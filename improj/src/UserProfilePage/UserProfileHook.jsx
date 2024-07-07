import { useEffect, useState } from "react";
import supabase from "../Supabase/Supabase";

export default function UserAccountData(account){

    const [accountData, setAccountData] = useState([]);
    const [profile, setProfile] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setLoading(true);
        const fetch = async () =>{
            try{
                const {data, error} = await supabase.from('books')
                .select()
                .eq('account_name', account);
    
                if(error){
                    alert("Error Fetching User Data");
                    console.log(error);
                }else{
                    setAccountData(data);
                    setLoading(false);
                }
            }
            catch(error){
                alert("error catching data");
                console.error(error.message);
            }
        }
        fetch();

        const fetchProfile = async () =>{
            try{
                const {data, error} = await supabase.from('Accounts')
                .select('profile')
                .eq('account_name', account)
                .single();

                if(error){
                    alert("Error Fetching Profile");
                    console.log(error);
                }else{
                    setProfile(data);
                }
            }
            catch(error){
                alert("error catch");
                console.error(error.message);
            }
        }
        fetchProfile();
        
    },[account])
    

    return {accountData, profile, loading};
}