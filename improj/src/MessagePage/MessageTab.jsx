import { useEffect, useState } from 'react';
import '../styles/message.css';
import MessageUser from './MessageWithUser';
import MessageTabHook from './MessageTabHook';

export default function MessageTab() {
    const [clickUser, setClickUser] = useState([]); // Initialize clickUser state as an empty string
    const [clickTrigger, setClickTrigger] = useState(false);
    const { messageData } = MessageTabHook();
    
    useEffect(() => {
        document.body.style.backgroundColor = "#FFF6F6";
        return () => {
            document.body.style.backgroundColor = "";
        }
    }, []);

    const clickedUser = (data) => {
        setClickUser(data.sender_name); // Set clickUser to the data object from messageData
        setClickTrigger(true);
    }

    return (
        <div className="grid-container-container">
            <div className="message-flex-container">
                <div className="message-list">
                    <div className="flex-container spaced-out headers">
                        <span style={{fontWeight: "600", fontSize: "15px", alignContent: "center"}}>All Messages</span>
                        {/* Hard-coded number below, usually where the back-end interaction is. */}
                        <span style={{color: "#C7C7C7", fontSize: "15px"}}>2</span>
                    </div>
                    <ul>
                        {messageData.map((data, index) => (
                            <li className="chat flex-container spaced-out" key={index} onClick={() => clickedUser(data)}>
                                <span className="profile-circle"></span>
                                <div style={{display: "flex", flexDirection: 'column', justifyContent: "start"}}>
                                    <span className="flex-container vertical-align">{data.sender_name}</span>
                                    <span className="last-messaged">2hrs ago</span>
                                </div>
                                
                            </li>
                        ))}
                
                    </ul>
                </div>

                <div className="messaging">
                    {clickTrigger ? (
                        <>
                            <MessageUser sender_name={clickUser} />
                            <div className='input-message-bar'>
                                <hr />
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <input placeholder='Enter Message...'></input>
                                    <span className="profile-circle" style={{marginLeft: "8%"}}></span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div style={{textAlign: "center"}}>Start Messaging!</div>
                    )}
                </div>
            </div>
        </div>
    );
}
