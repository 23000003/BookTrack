import { useState } from 'react';
import '../styles/Admin.css'
import useAdminView from './AdminViewHook';
import ViewUserData from './AdminViewUserData';

export default function AdminViewAccount(){

    const [typeView, setTypeView] = useState(true); 
    const [viewUserData, setViewUserData] = useState({})
    const [view, setView] = useState(false);
    const [viewUserName, setViewUsername] = useState('')

    const {
        viewUsers,
        viewUsersSell,
        FetchViewUserSell,
        ViewUserItems,
        userBooksData,
        usersWithBooks
    } = useAdminView();

    console.log("hey",viewUsers)

    return(
        <>
        <div className="account-data">
            <h2 style={{marginLeft: "20px"}}>Accounts</h2>
            <h2 style={{marginLeft: '27%'}}>No. of Books on Sale</h2>
        </div>
        <div className="Accounts-Viewcontainer" key={true}>
            {viewUsers.length > 0 && viewUsers.map((user, index) => (
                <>
                <div className="Accounts1" key={index}>
                    <div className="Account-ViewLabel">
                        <div className="ViewUserAccount">
                            <img src={user.user.profile} alt=""/>
                            <h4 style={{marginLeft:"40px"}}>{user.user.account_name}</h4>
                        </div>
                        <div className="view-user-data">
                            <p>{user.books.length}</p>
                            <button className="View-button" 
                                onClick={() => {
                                    setViewUserData(user.books), 
                                    setTypeView(true),
                                    setView(!view),
                                    setViewUsername(user.user.account_name)
                                }}
                            >View</button>
                        </div>
                    </div>
                </div>
                
                </>
            ))}
            {/**Fetching done just displaying */}
        
            {view && (
                <>
                <ViewUserData
                    viewUserData = {viewUserData}
                    view = {view}
                    setView = {setView}
                    user = {viewUserName}
                />
                
                </>
            )}
        </div>
        </>
    );
}