import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import * as XLSX from 'xlsx';
import supabase from '../Supabase/Supabase';

export default function UploadBulkData() {
    
    const [file, setFile] = useState(null);
    const [newBook, setNewBook] = useState([]);
    const [images, setImages] = useState([]);
    const [ebookFiles, setEbookFiles] = useState([]);
    const [uploadLoading, setUploadLoading] = useState(false);

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
                        isPosted: true  // Change this to int so we can delete 1by1 para d mo delete even if naa pay post
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

    const MyImages = (event) => {
        const selectedFiles = Array.from(event.target.files); // Convert FileList to array
        setImages(prevFiles => [...prevFiles, ...selectedFiles]);
    };
  
    const MyEbookFiles = (event) =>{
        const selectedFiles = Array.from(event.target.files); 
        setEbookFiles(prevFiles => [...prevFiles, ...selectedFiles]);
    }

    const SelectFiles = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async (type) => {
        
        if (!file) {
            alert('Please select a file first!');
            return;
        }
        if(!images){
            alert('Please select your images first');
        }
        if(!ebookFiles){
            alert('Please select your ebook Files first');
        }
        setUploadLoading(true);
        
        const fileExtension = file.name.split('.').pop().toLowerCase();

        if (fileExtension === 'csv') {
            Papa.parse(file, {
                header: true,
                complete: async (results) => {
                    const cleanedData = results.data.filter(row => 
                        Object.values(row).some(value => value !== null && value !== '')
                    );
                    await uploadToSupabase(cleanedData, type);
                },
            });
        }  
        else {
            alert('Your File is Unsupported! Download The Guide');
        }
    }

    const uploadToSupabase = async (data, type) => {
        
        if(type === 'e-books'){

            // Upload Images
            for (const image of images) {
                const { data, error } = await supabase.storage
                .from('images')
                .upload(`ebooks/${image.name}`, image);

                if (error) {
                    console.error('Error uploading image:', error);
                    alert('Error uploading image already exist: ' + error.message);
                    setUploadLoading(false);
                    return;
                }
            }

            // Upload Ebook Files
            for (const ebook of ebookFiles) {
                const { data, error } = await supabase.storage
                .from('images')
                .upload(`ebooks/${ebook.name}`, ebook);

                if (error) {
                    console.error('Error uploading ebook:', error);
                    alert('Error uploading ebook Already Exist ' + error.message);
                    setUploadLoading(false);
                    return;
                }
            }

        }

        const { data: insertedData, error } = await supabase
        .from('books') 
        .insert(data);

        if (error) {
            console.error('Error uploading data:', error);
            alert('Error uploading data: ' + error.message);
        } else {
            setUploadLoading(false);
            alert('Data uploaded successfully!');
            console.log('Uploaded data:', insertedData);
        }
    };


  return { 
        SelectFiles, 
        handleUpload, 
        MyImages, 
        images,
        MyEbookFiles,
        ebookFiles,
        uploadLoading
    };
 
}