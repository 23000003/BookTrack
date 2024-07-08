import '../styles/Admin.css'
import useAdminView from './AdminViewHook';

export default function AdminViewAccount(){

    const {
        viewUsers,
        viewUsersSell,
        FetchViewUserSell
    } = useAdminView();

    console.log("hey",viewUsers)
    return(
        <>
        <div className="account-data">
            <h2 style={{marginLeft: "5%"}}>Accounts</h2>
            <h2 style={{marginLeft: '27%'}}>No. of Books on Sale</h2>
            <h2 style={{marginLeft: '18%'}}>Total Transaction</h2> {/**Fix this responsiveness */}
        </div>
        <div className="Accounts-Viewcontainer">
            {viewUsers.length > 0 && viewUsers.map((user, index) => (
                <>
                <div className="Accounts1" key={index}>
                    <div className="Account-ViewLabel">
                        <div className="ViewUserAccount">
                            <img src={user.profile} alt=""/>
                            <h4 style={{marginLeft:"40px"}}>{user.account_name}</h4>
                        </div>
                        <p>5</p>
                        <p>5</p>
                        <button className="View-button">View</button>
                    </div>
                </div>
                </>
            ))}
            <hr/>
        </div>
        </>
    );
}