import { useEffect } from "react";
import supabase from "../Supabase/Supabase";


export default function useViewOrder(){

    useEffect(() =>{

        const fetch = async () =>{
            const {data} = await supabase.from('transaction')
            .select()
            .eq('seller_name', user)
            
        }

    }, [])

}