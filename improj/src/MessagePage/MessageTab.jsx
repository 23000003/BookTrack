import { useEffect, useState } from 'react';
import '../styles/message.css';
import MessageUser from './MessageWithUser';
import MessageTabHook from './MessageTabHook';
import supabase from '../Supabase/Supabase';
import ConvertDate from '../Supabase/TimeConverter';

export default function MessageTab() {
    const [clickUser, setClickUser] = useState([]);
    const [clickTrigger, setClickTrigger] = useState(false);
    const [enterMessage, setEnterMessage] = useState('');
    const { messageData, sendMessage, setMessage, loading } = MessageTabHook();

    useEffect(() => {
        document.body.style.backgroundColor = "#FFF6F6";
        return () => {
            document.body.style.backgroundColor = "";
        }
    }, []);

    // useEffect(() => {
    //     const subscription = supabase.channel('unread_messages')
    //         .on('postgres_changes', {
    //             event: 'UPDATE',
    //             schema: 'public',
    //             table: 'unread_messages'
    //         }, (payload) => {
    //             console.log(payload);
    //             setMessage((prevContent) => {
    //                 return prevContent.map(message => 
    //                     message.id === payload.new.id ? payload.new : message
    //                 );
    //             });
    //         })
    //         .subscribe();
    
    //     return () => {
    //         subscription.unsubscribe();
    //     };
    // }, [setMessage]);

    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text;
        }
        return text.slice(0, maxLength - 3) + '...';
    }

    const [overlayNotif, setOverlayNotif] = useState(true);

    const clickedUser = (data) => {
        setClickUser(data.sender_name); 
        setClickTrigger(true);

        setOverlayNotif(false);
        const ReadNotif = async (data) =>{
            const {data: unread, error: unreadError} = await supabase.from('unread_messages')
            .update({
                receiver_notif: 0
            })
            .eq('receiver_name', data.receiver_name)
            .eq('sender_name', data.sender_name);
            console.log(unread)
        }
        ReadNotif(data);
    }

    const passMessage = () =>{
        setEnterMessage(enterMessage => enterMessage = '');
        sendMessage(clickUser, enterMessage);
        console.log(enterMessage)
    }   

    return (
        <div className="grid-container-container">
            <div className="message-flex-container">
                <div className="message-list">
                    <div className="flex-container spaced-out headers">
                        <span style={{fontWeight: "600", fontSize: "15px", alignContent: "center"}}>All Messages</span>
                        <span style={{color: "#C7C7C7", fontSize: "15px", marginLeft: "15px"}}>{messageData.length}</span>
                    </div>
                    <ul>
                        {loading ? (
                            <div class="messageloader"></div>
                        ):(
                            messageData.length > 0 ? (
                                messageData.map((data, index) => (
                                    <li className="chat flex-container spaced-out" key={index} onClick={() => clickedUser(data)}>
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <img src={data.profile} alt="" />
                                            <div style={{display: "flex", flexDirection: 'column', justifyContent: "start"}}>
                                                <span className="flex-container vertical-align">{truncateText(data.sender_name, 15)}</span>
                                                <span className="last-messaged">{ConvertDate(data.time_sent)}</span>
                                            </div>
                                        </div>
                                        {data.receiver_notif !== 0 && overlayNotif &&(
                                            <span className='notif-num'>{data.receiver_notif}</span>
                                        )}
                                    </li>
                                ))
                            ):(
                                <div className='no-messages'>No Messages!</div>
                            )
                        )}
                    </ul>
                </div>

                <div className="messaging">
                    {clickTrigger ? (
                        <>
                            <MessageUser sender_name={clickUser} />
                            <div className='input-message-bar'>
                                <hr />
                                <div style={{display: "flex", alignItems: "center"}}>
                                    <input type="file" />
                                    <input placeholder='Enter Message...' 
                                        onChange={(e) => setEnterMessage(e.target.value)} 
                                        value={enterMessage}
                                        style={{outline: "none"}}>
                                    </input>
                                    
                                    <span className="message-circle" 
                                        style={{marginLeft: "8%", cursor: "pointer"}}
                                        onClick={() => passMessage()}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill bi-cent" viewBox="0 0 16 16">
                                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className='start-message'>Start a Conversation ...</div>
                    )}
                </div>
            </div>
        </div>
    );
}
