import axios from "axios"


export default function useNodeMailerHook(){

    const sendEmail = (email, subject, message) => {
        axios.get("http://localhost:4000/", {
            params: {
                email,
                subject,
                message,
            },
        })
        .then(() =>{
            console.log("success")
        })
        .catch(() =>{
            console.log("failure");
        })
    };

    return { sendEmail };
}