import useMessageContent from './MessageContentsHook';
import supabase from '../Supabase/Supabase';
import { useEffect, useRef } from 'react';

export default function MessageUser({ sender_name }) {
    
    const { senderPfp, content, setContent } = useMessageContent(sender_name);
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

    useEffect(() => { //realtime update
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

    return (
        <>
            <div className='messaging-identify'>
                <span className="flex-container vertical-align">
                    <img src={senderPfp.profile} className="profile-circle"></img>
                    {sender_name}
                </span>
            </div>

            <div className='overflow-scroll' ref={scrollRef}>
                <div className='message-content'>
                    {content.map((data, index) => (
                        <div key={index} className={data.sender_name === sender_name ? 'sender' : 'You'}>
                            {data.sender_name === sender_name ? (
                                <>
                                    <div>
                                    <img src={senderPfp.profile} className="profile-circle"></img>
                                    </div>
                                    <span className='sender-content'>{data.content}</span>
                                </>
                            ) : (
                                <>
                                    <span className='You-content'>{data.content}</span>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
