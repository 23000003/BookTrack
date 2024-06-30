import { useUser } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';
import supabase from '../Supabase/Supabase';

export default function UserHook(){
    const checkUser = useUser();
    const [user, setUser] = useState([]);
    const [userloading, setLoading] = useState(true);

    useEffect(()=>{
        setLoading(true);
        const getUserData = async () =>{
            if(checkUser === null){
                setLoading(false);
            }else{
                const {data, error} = await supabase.from('Accounts')
                .select()
                .eq('email', checkUser.email)
                .single();
    
                if(error){
                    alert("Can't Find Account");
                    console.log(error);
                }else{
                    setLoading(false);
                    setUser(data);
                }
            }
        }
        
        getUserData();
    },[checkUser]);


    return {user, checkUser, userloading, setUser};
}

