import { useEffect, useState } from "react";
import supabase from '../Supabase/Supabase';
import useEditData from "./EditDataDetails";
import useApproveDecline from "./ApproveDeclineHook";
import norequest from "../assets/no_request.png"

export default function AdminPostApproval() {
    const [approveData, setApproveData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [view, setView] = useState(false);
    const [typeView, setTypeView] = useState(true); //if true, shows books, if false shows ebooks


    const { 
        Approve, 
        Decline, 
        loadingAD,
        SingleDecline,
        UpdateUser
    } = useApproveDecline();

    const {
        handleBlur,
        handleInputChange,
        handleApprove,
        selectedUser, 
        editableValues, 
        userBooksPosted,
        loading1,
        setUserBooksPosted
    } = useEditData();

    useEffect(()=>{

        if(view === true){
            document.body.style.overflow = 'hidden';
        }else{
            document.body.style.overflow = 'auto'
        }

    },[view]);

    useEffect(() => {
        const fetchAccounts = async () => {
            const { data, error } = await supabase.from('Accounts')
                .select()
                .eq('isPosted', true);

            if (error) {
                alert("Error fetching approval");
                console.log(error);
            } else {
                setApproveData(data);
                setLoading(false);
            }
        };

        fetchAccounts();
    }, []);

    useEffect(() => {
        const subscription = supabase.channel('books')
            .on('postgres_changes', {
                event: 'DELETE',
                schema: 'public',
                table: 'books'
            }, (payload) => {
                console.log(payload);
                setUserBooksPosted((prevContent) => [...prevContent, payload.new]);
            })
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [setUserBooksPosted]);

    
    return (
        <>
        <div className="account-data">
            <h2 style={{ marginLeft: "20px" }}>Post Approval</h2>
            <h2 style={{ marginLeft: '25%' }}>Sort By: </h2>
            <h2 style={{ marginLeft: '6px' }}>Bulk Post</h2>
        </div>    
        <div className="Accounts-container" style={{ height: approveData.length > 0 ? '' : '100%' }}>
            {loading ? (
                <div className='admin-loader'>
                    <div class="messageloader"></div>
                </div>
            ) : (
                approveData.length > 0 ? (
                    <>
                    {approveData.map((account, index) => (
                        <div className="Accounts" key={index}>
                            <div className="Accounts-notapprove">
                                <div className='Account-details'>
                                    <img src={account.profile} alt="Profile" />
                                    <h4 style={{ marginLeft: "15px" }}>Posted By: {account.account_name}</h4>
                                </div>
                                <div>
                                    <button onClick={() => UpdateUser(account.account_name)}>Remove</button>
                                    <button className="Approve-button" 
                                        onClick={() => {
                                            handleApprove(account.account_name, 'physical'), 
                                            setView(!view), 
                                            setTypeView(true)}}
                                    >View</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    
                    <hr />
                    </>
                ) : (
                    <div className="no-approval-post">
                        <img src={norequest} style={{height: "59px"}}/>
                        <p>No accounts available for approval.</p>
                    </div>
                )
            )}
            
        </div>
        {view && (
            <>
            <div className="outside" onClick={() => setView(!view)}></div>
            <div className='InApproval'>
                {loading1 ? (
                    <div className='loading'>
                        <div className='loader'></div>
                    </div>
                ): (
                    <>
                    <div className="book-listed-by">
                        <h2>{typeView ? "Books" : "E - Books"} Listed by {selectedUser}</h2>
                        {typeView ? (
                            <button onClick={() => {handleApprove(selectedUser, 'e-book'), setTypeView(false)}}>E - Books</button>
                        ):(
                            <button onClick={() => {handleApprove(selectedUser, 'physical'), setTypeView(true)}}>Books</button>
                        )}
                        {/* <button onClick={() => Try()}>Decline</button> */}
                        <button onClick={() => Decline(selectedUser, typeView)}>Decline</button>
                        <button onClick={() => Approve(selectedUser, typeView)}>Approve</button>
                    </div>
                    
                    <div className="approval-attributes">
                        <table>
                            <thead>
                                <tr>
                                    <th>book_title</th>
                                    <th>book_genre</th>
                                    <th>imagetag</th>
                                        
                                    {typeView ? (
                                        <>
                                        <th>location</th>
                                        <th>city</th>
                                        <th>location_tag</th>
                                        <th>book_type</th>
                                        </>
                                    ):(
                                        <>
                                        <th>book_type</th>
                                        <th>file</th>
                                        </>
                                    )}
                                    
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {userBooksPosted.length > 0 ? (
                                    userBooksPosted.map((book) => (
                                        <tr key={book.id}>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="table-input"
                                                    value={editableValues[book.id]?.book_title || ''}
                                                    onChange={(e) => handleInputChange(e, book.id, 'book_title')}
                                                    onBlur={() => handleBlur(book.id)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="table-input"
                                                    value={editableValues[book.id]?.book_genre || ''}
                                                    onChange={(e) => handleInputChange(e, book.id, 'book_genre')}
                                                    onBlur={() => handleBlur(book.id)}
                                                />
                                            </td>
                                            <td>
                                                <input
                                                    type="text"
                                                    className="table-input"
                                                    value={editableValues[book.id]?.imagetag || ''}
                                                    onChange={(e) => handleInputChange(e, book.id, 'imagetag')}
                                                    onBlur={() => handleBlur(book.id)}
                                                    style={{width: "800px"}}
                                                />
                                            </td>
                                            {typeView ? (
                                                <>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="table-input"
                                                        value={editableValues[book.id]?.location || ''}
                                                        onChange={(e) => handleInputChange(e, book.id, 'location')}
                                                        onBlur={() => handleBlur(book.id)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="table-input"
                                                        value={editableValues[book.id]?.city || ''}
                                                        onChange={(e) => handleInputChange(e, book.id, 'city')}
                                                        onBlur={() => handleBlur(book.id)}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="table-input"
                                                        value={editableValues[book.id]?.location_tag || ''}
                                                        onChange={(e) => handleInputChange(e, book.id, 'location_tag')}
                                                        onBlur={() => handleBlur(book.id)}
                                                        style={{width: "1000px"}}
                                                    />
                                                </td>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="table-input"
                                                        value={editableValues[book.id]?.book_type || ''}
                                                        onChange={(e) => handleInputChange(e, book.id, 'book_type')}
                                                        onBlur={() => handleBlur(book.id)}
                                                    />
                                                </td>
                                                </>
                                            ):(
                                                <>
                                                <td>
                                                    <input
                                                        type="text"
                                                        className="table-input"
                                                        value={editableValues[book.id]?.book_type || ''}
                                                        onChange={(e) => handleInputChange(e, book.id, 'book_type')}
                                                        onBlur={() => handleBlur(book.id)}
                                                    />
                                                </td> 
                                                <td> 
                                                    <input
                                                        type="text"
                                                        className="table-input"
                                                        value={editableValues[book.id]?.file || ''}
                                                        onChange={(e) => handleInputChange(e, book.id, 'file')}
                                                        onBlur={() => handleBlur(book.id)}
                                                    />
                                                </td>
                                                </>
                                            )}
                                            <button onClick={() => 
                                                SingleDecline(book.id, 
                                                        book.imagetag, 
                                                        book.file, 
                                                        typeView)}>Decline
                                            </button>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7">No books available for this user.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    </>
                )}
            </div>
            </>
        )}
        {loadingAD && (
            <>
            <div className='upload-loader'></div>
            <div className='loading center-loader'>
                <div className='loader'></div>
            </div>
            </>
        )}
        </>
    );
}
