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
    const [uploadLoading, setUploadLoading] = useState(false);
    const [ebookFile, setEbookFile] = useState(null);

    const UploadBook = async (type) =>{
        
        if(image.file.length === 0){
            alert('Put Image!');
            return;
        }else{
            const imageURL = `https://wfiljmekszmbpzaqaxys.supabase.co/storage/v1/object/public/images/books/${image.name}`;
            setUploadLoading(true);
        }

        if(type === 'physical'){
            
            if(title === '' || price === '' || location === '' || pasteLoc === '' ||
                genre === '' || quantity === '' || author === '' || description === ''
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
                imagetag: imageURL,
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
                const { data, error } = await supabase.storage
                .from('images')
                .upload('books/' + image.name, image);

                if(error){
                    alert("Error uploading bookimage to storage");
                    console.error(error);
                }else{
                    alert("Upload Book Successfully!");
                }
            }
        
        }else if(type === 'e-book'){

            if(title === '' || price === '' || genre === '' || 
                author === '' || description === '' || ebookFile === null
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
                imagetag: imageURL,
                description: description,
                author: author,
                book_type: 'e-book',
                file: ebookFile.name
            })

            if(error){
                console.log(error)
                alert("error ebook insert")
            }else{
                const { data, error } = await supabase.storage
                .from('images')
                .upload('ebooks/' + image.name, image);

                if(error){
                    alert("Error uploading Ebookimage to storage");
                    console.error(error);
                }else{
                    const { data, error } = await supabase.storage
                    .from('images')
                    .upload('ebooks/' + ebookFile.name, ebookFile);

                    if(error){
                        alert("Error uploading ebookFile to storage");
                        console.error(error);
                    }else{
                        alert("Upload Book Successfully!");
                    }
                }
            }
        }
        
        setUploadLoading(false);
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
        image,
        uploadLoading,
        setEbookFile
    };
}