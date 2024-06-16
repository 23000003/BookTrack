import { useUser } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import supabase from '../Supabase';

export default function UserHook(){
    const checkUser = useUser();
    const [user, setUser] = useState([]);
    
    useEffect(()=>{
        
        const getUserData = async () =>{
            const {data, error} = await supabase.from('Accounts')
            .select()
            .eq('email', checkUser.email)
            .single();

            if(error){
                alert("Can't Find Account");
                console.log(error);
            }else{
                setUser(data);
            }
        }
        getUserData();
    },[checkUser]);


    return {user, checkUser};
}

