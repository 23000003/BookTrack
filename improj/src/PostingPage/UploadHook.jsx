import { useState, useEffect } from "react";
import UserHook from "../Supabase/UserSessionData";
import {v4 as uuidv4} from 'uuid';
import supabase from '../Supabase/Supabase';

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
    const [city, setCity] = useState('');
    const [newBook, setNewBook] = useState([]);

    useEffect(() => { 
        const subscription = supabase.channel('books')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'books'
            }, (payload) => {
                console.log(payload.new.id);
                setNewBook(prevBooks => [...prevBooks, payload.new]);
                
                const insert = async () =>{
                    const {error} = await supabase.from('books_sell')
                    .insert({
                        book_id: payload.new.id,
                        account_name: payload.new.account_name
                    })
                    
                    if(error){
                        console.log(error);
                    }

                    const {error: errorAcc} = await supabase.from('Accounts')
                    .update({
                        isPosted: true
                    })
                    .eq('account_name', payload.new.account_name) 
                }   
                insert();
            })
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [setNewBook]);


    const UploadBook = async (type) =>{
        
        const uniqueID = uuidv4()
        const uniqueIDFile = uuidv4()
        let imageURL;

        if(!image){
            alert('Put Image!');
            return;
        }else{
            imageURL = `https://wfiljmekszmbpzaqaxys.supabase.co/storage/v1/object/public/images/books/${uniqueID}`;
            setUploadLoading(true);
        }

        if(type === 'physical'){
            console.log(uniqueID)
            if(title === '' || price === '' || location === '' || pasteLoc === '' ||
                genre === '' || quantity === '' || author === '' || description === '' ||
                city === ''
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
                .upload('books/' + uniqueID, image);

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
                file: uniqueIDFile
            })

            if(error){
                console.log(error)
                alert("error ebook insert")
            }else{
                const { data, error } = await supabase.storage
                .from('images')
                .upload('ebooks/' + uniqueID, image);

                if(error){
                    alert("Error uploading Ebookimage to storage");
                    console.error(error);
                }else{
                    const { data, error } = await supabase.storage
                    .from('images')
                    .upload('ebooks/' + uniqueIDFile, ebookFile);

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
        setEbookFile,
        setCity
    };
}