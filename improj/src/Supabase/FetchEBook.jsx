import { useEffect, useState } from 'react'
import supabase from './Supabase'


export default function Ebooks(){

    const [eBooks, setEBooks] = useState([]);

    useEffect(() =>{
        let temp = [];
        const Fetch = async () =>{
            const {data, error} = await supabase.from('history')
            .select()
            .neq('file', null)

            if(error){
                console.log(error);
            }else{
                temp.push({data});
                setEBooks(temp);
            }
        }
        Fetch();
    },[])


    return eBooks;
}