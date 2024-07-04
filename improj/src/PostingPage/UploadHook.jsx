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
    const [secondHand, setSecondHand] = useState(false);
    const [image, setImage] = useState(null);
    
    const UploadBook = async (type) =>{

        if(type === 'physical'){
            
            if(title === '' || price === '' || location === '' || pasteLoc === '' ||
                genre === '' || quantity === '' || author === '' || description === '' ||
                image.files.length === 0
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
                second_hand: secondHand,
                book_price: price,
                imagetag: image,
                description: description,
                location: location, // update
                author: author,
                location_tag: pasteLoc,
                city: city, //update
                book_type: 'physical'
            })

            if(error){
                console.log(error)
                alert("error book insert")
            }else{
                alert("Upload Book Successfully!")
            }
        
        }else if(type === 'e-book'){

            if(title === '' || price === '' || genre === '' || 
                author === '' || description === '' || image === null
            ){
                alert('Input all fields');
                return;
            }

            const {error} = await supabase.from('books')
            .insert({
                book_title: title,
                book_genre: genre,
                account_name: user.account_name,
                book_price: price,
                imagetag: image,
                description: description,
                author: author,
                book_type: 'e-book',
                file: file // still needs file functionality
            })

            if(error){
                console.log(error)
                alert("error ebook insert")
            }else{
                alert("Upload E - Book Successfully!")
            }
        }
        

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
        UploadBook,
        image
    };
}