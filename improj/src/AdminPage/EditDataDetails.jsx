import { useState } from "react";
import supabase from "../Supabase/Supabase";

export default function useEditData(){

    const [selectedUser, setSelectedUser] = useState(null);
    const [editableValues, setEditableValues] = useState({}); 
    const [userBooksPosted, setUserBooksPosted] = useState([]);
    const [loading1, setLoading1] = useState(true);

    const handleApprove = async (user, bookType) => {
        setLoading1(true);
        
        const { data, error } = await supabase.from('books')
            .select()
            .eq('account_name', user)
            .eq('isApprove', false)
            .eq('book_type', bookType);

        if (error) {
            console.log(error);
        } else {
            setUserBooksPosted(data);
            setSelectedUser(user); //selected user for viewing details

            const initialEditableValues = {};
            data.forEach(book => {         // So we can edit the table
                initialEditableValues[book.id] = {
                    book_title: book.book_title,
                    book_genre: book.book_genre,
                    location: book.location,
                    city: book.city,
                    imagetag: book.imagetag,
                    location_tag: book.location_tag,
                    book_type: book.book_type,
                    file: book.file
                };
            });
            setEditableValues(initialEditableValues);
            setLoading1(false);
        }
    };

    const handleInputChange = (e, bookId, field) => {
        const newValue = e.target.value;
        setEditableValues(prevValues => ({
            ...prevValues,
            [bookId]: {
                ...prevValues[bookId],
                [field]: newValue
            }
        }));
    };

    const handleBlur = async (bookId) => {
        const updatedValues = editableValues[bookId];
        const { error } = await supabase
            .from('books')
            .update(updatedValues)
            .eq('id', bookId);

        if (error) {
            console.error('Error updating data:', error);
        } else {
            const updatedBooks = userBooksPosted.map(book =>
                book.id === bookId ? { ...book, ...updatedValues } : book
            );
            setUserBooksPosted(updatedBooks);
        }
    };


    return{
        handleBlur,
        handleInputChange,
        handleApprove,
        selectedUser, 
        editableValues, 
        userBooksPosted,
        loading1,
        setUserBooksPosted
    }
}