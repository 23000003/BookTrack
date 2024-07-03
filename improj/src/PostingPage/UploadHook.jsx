import { useState } from "react";
import UserHook from "../Supabase/UserSessionData";


export default function useUploadHook(){

    const { user } = UserHook();

    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('');
    const [pasteLoc, setPasteLoc] = useState('');
    const [genre, setGenre] = useState('');
    const [quantity, setQuantity] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [secondHand, setSecondHand] = useState('');
    const [image, setImage] = useState(null);

    const UploadBook = async () =>{

        if(title === '' || price === '' || location === '' || pasteLoc === '' ||
            genre === '' || quantity === '' || author === '' || description === '' ||
            image === null
        ){
            alert('Input all fields');
            return;
        }

        const {error} = await supabase.from('books')
        .insert({
            book_title: title,
            book_genre: genre,
            book_quantity: quantity,
            account_name: user.account_name,
            second_hand: secondHand, //update since its bool
            book_price: price,
            imagetag: image,
            description: description,
            location: location, // update
            author: author,
            location_tag: pasteLoc,
            city: city, //update
            book_type: 'physical'
        })

    }
    
    return{
        setTitle,
        setPrice,
        setLocation,
        setPasteLoc,
        setGenre,
        setQuantity,
        setAuthor,
        setDescription,
        setSecondHand,
        setImage,
        UploadBook
    };
}