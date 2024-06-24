import useMessageContent from './MessageContentsHook'

export default function MessageUser({sender_name}){

    const {content} = useMessageContent(sender_name);
    
    // const changes = client
    // .channel('messages')
    // .on('postgres_changes', 
    // { event: 'INSERT', schema: 'public', table: 'messages' }, 
    // handleInserts)
    // .subscribe()

    console.log(content);
    return (
        <>
            <div className='messaging-identify'>
                <span className="flex-container vertical-align">
                    <span className="profile-circle"></span>
                    {sender_name}
                </span>
            </div>

            <div className='overflow-scroll'>
                <div className='message-content'>
    
                {content.map((data, index) => (
                    <>
                        {data.sender_name === sender_name ? (
                            <div className='sender' key={index}>
                                <div>
                                    <span className='profile-circle'></span>
                                </div>
                                <span className='sender-content'>{data.content}</span>
                            </div>
                        ) : (
                            <div className='You' key={index}>
                                <span className='You-content'>{data.content}</span>
                                <div>
                                    <span className='profile-circle'></span>
                                </div>
                            </div>
                        )}
                    </>
                ))}
                    {/* <div className='sender'>
                        <div>
                            <span className='profile-circle'></span>
                        </div>
                        <span className='sender-content'>w</span>
                    </div> */}
                   

                    {/* <div className='sender'>
                        <div>
                            <span className='profile-circle'></span>
                        </div>
                        <span className='sender-content'>SE WAD WA SENDEERSEWAD WDADwad wad ad awdawWAAWDAD</span>
                    </div>

                    

                    <div className='You'>
                        <span className='You-content'>LOL</span>
                        <div>
                            <span className='profile-circle'></span>
                        </div>
                    </div>

                    <div className='sender'>
                        <div>
                            <span className='profile-circle'></span>
                        </div>
                        <span className='sender-content'>SE WAD WA SENDEERSEWAD WDADwad wad ad awdawWAAWDAD</span>
                    </div>

                    <div className='sender'>
                        <div>
                            <span className='profile-circle'></span>
                        </div>
                        <span className='sender-content'>SE WAD WA SENDE DWAD WAD WADWAAWD WA WAD WERSEWAD WDADwad wad ad awdawWAAWDAD</span>
                    </div>

                    <div className='sender'>
                        <div>
                            <span className='profile-circle'></span>
                        </div>
                        <span className='sender-content'>SE WAD WA S DWAD WAD WAD WAD AW DWA DWA DWA ENDEERSEWAD WDADwad wad ad awdawWAAWDAD</span>
                    </div>

                    <div className='You'>
                        <span className='You-content'>LOL</span>
                        <div>
                            <span className='profile-circle'></span>
                        </div>
                    </div>
                    <div className='You'>
                        <span className='You-content'>LOL WTF</span>
                        <div>
                            <span className='profile-circle'></span>
                        </div>
                    </div>
                    <div className='You'>
                        <span className='You-content'>LOL WTF</span>
                        <div>
                            <span className='profile-circle'></span>
                        </div>
                    </div>
                    <div className='You'>
                        <span className='You-content'>LOL WTF</span>
                        <div>
                            <span className='profile-circle'></span>
                        </div>
                    </div>
                    <div className='You'>
                        <span className='You-content'>LOL WTF</span>
                        <div>
                            <span className='profile-circle'></span>
                        </div>
                    </div> */}

                </div>
            </div>
        </>
    );
}