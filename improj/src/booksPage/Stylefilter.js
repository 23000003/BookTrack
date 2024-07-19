import { useEffect } from "react";


export default function staticbg(genre, filterGenre){      // Change this to useRef Instead

    let gen = ['Novel', 'Science', 'Fiction',
                'Manga', 'Romance', 'Self-Help', 'Others'];

    for(let i = 0; i < gen.length; i++){
        document.querySelector('.' + gen[i]).style.backgroundColor = '';
    }
    console.log(filterGenre)
    if(filterGenre === false){
        document.querySelector('.'+ genre).style.backgroundColor = '#d4d0d038';
    }

}