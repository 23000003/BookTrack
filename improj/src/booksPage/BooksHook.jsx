import { useState } from "react";


export default function DisplayHook(data){
    const [passDets, passDetsState] = useState([]);
    const [bookDets, bookDetsState] = useState(false);

    const DisplayDets = (data) =>{
        passDetsState(data); //passes the clicked item to BookDetails
        if(bookDets === false){
            bookDetsState(true);
        }else{
            bookDetsState(false);
        }
    }

    return {passDets, bookDets, DisplayDets}
}