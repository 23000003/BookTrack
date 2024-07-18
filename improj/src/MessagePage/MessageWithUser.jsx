import useMessageContent from './MessageContentsHook';
import supabase from '../Supabase/Supabase';
import { useEffect, useRef, useState } from 'react';

export default function MessageUser({ sender_name }) {
    
    const { 
        senderPfp, 
        content, 
        setContent, 
        loading, 
        user,
        setSubjectReport,
        setContentReport,
        SendReport,
        reportLoading,
        confirmationButton,
        setConfirmButton
    } = useMessageContent(sender_name);
    
    const scrollRef = useRef(null);
    console.log("pfp", senderPfp)
    
    const scrollToBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [content]);

    useEffect(() => {
        const subscription = supabase.channel('messages')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'messages'
            }, (payload) => {
                console.log(payload);
                setContent((prevContent) => [...prevContent, payload.new]);
            })
            .subscribe();

        return () => {
            subscription.unsubscribe();
        };
    }, [setContent]);

    console.log(content);

    const [reportButton, setReportButton] = useState(false);
    
    return (
        <>
            <div className='messaging-identify'>
                <span className="flex-container vertical-align">
                    {loading ? (
                        <div className='messageloader'></div>
                    ):(
                        <>
                        <img src={senderPfp.profile} className="profile-circle" alt="Sender Profile" />
                        {sender_name}
                        </>
                    )}
                </span>
                <span className='span-report' onClick={() => setReportButton(true)}>Report</span>
                
                {reportButton && (
                    <>
                    <div className="exposure" onClick={() => setReportButton(false)}></div>
                    <div className="Sell-container report">
                        <div className='report-1st'>
                            <h3>Report</h3>
                        </div>
                        <hr />
                        <div className='report-2nd'>
                            <h3>Subject: *</h3>
                            <input type="text" onChange={(e) => setSubjectReport(e.target.value)}/>
                            <h3>Content: *</h3>
                            <textarea type="text" onChange={(e) => setContentReport(e.target.value)}/>
                            <button onClick={() => SendReport('')}>Send Report</button>
                        </div>
                    </div>
                    </>
                )}

            </div>

            {confirmationButton && (
                <>
                <div className="exposure expoconfir"></div>
                <div className="confirmation">
                    <h3>Confirm Report?</h3>
                    <div className="confirmation-buttons">
                        <button onClick={() => setConfirmButton(false)}>
                            Decline
                        </button>
                        <button onClick={() => SendReport('confirm')}>
                            Confirm
                        </button>
                    </div>
                </div>
                </>
            )}

            {reportLoading && (
                <div className="reportloading">

                </div>
            )}

            <div className='overflow-scroll' ref={scrollRef}>
                <div className='message-content'>
                    {loading ? (
                        <div className='messageloader'></div>
                    ) : (
                        content.map((data, index) => {
                            const isSenderToReceiver = data.sender_name === sender_name && data.receiver_name === user.account_name;
                            const isReceiverToSender = data.sender_name === user.account_name && data.receiver_name === sender_name;
    
                            if (isSenderToReceiver || isReceiverToSender) {
                                return (
                                    <div key={index} className={data.sender_name === sender_name ? 'sender' : 'You'}>
                                        {data.sender_name === sender_name ? (
                                            data.receiver_name === user.account_name && (
                                                <>
                                                    <div>
                                                        <img src={senderPfp.profile} className="profile-circle" alt="Sender Profile" />
                                                    </div>
                                                    <span className='sender-content'>{data.content}</span>
                                                </>
                                            )
                                        ) : (
                                            data.receiver_name === sender_name && (
                                                <span className='You-content'>{data.content}</span>
                                            )
                                        )}
                                    </div>
                                );
                            }
                            return null;
                        })
                    )}
                </div>
            </div>
        </>
    );
}    