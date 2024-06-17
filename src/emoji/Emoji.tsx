import React, { ChangeEvent, useState } from "react";
import axios from 'axios'
export const Emoji =()=>{
    const [slug,setSlug] = useState<string>('');
    const [character,setCharacter] =useState<string>('');
    const [errormessage,setErrormessage] =useState<string>('');
    const API_KEY = 'e4dc089c8fa2c64a18be7d867ba155d16901cf23';

    const handleChange =(e:ChangeEvent<HTMLInputElement>) =>{
        setSlug(e.target.value)
    }
    const handelsync =async()=>{
        try{
            const response =  await axios(`https://emoji-api.com/emojis?search=${slug}&access_key=${API_KEY}`)
            if (response.data.length>0)
                {
                   setCharacter(response.data[0].character)
                   setErrormessage('')
                }
                else{
                    setCharacter('')
                    setErrormessage("not found")
                }
        }
        catch(error)
        {
            console.error('Error fetching emoji:', error);
      setCharacter('');
      setErrormessage('Error fetching emoji');}
    }
    return(
        <>
       <input   value={slug}  onChange={handleChange} placeholder="enter emoji "/>
       <button onClick={handelsync}>
Get
       </button>
      {character && <div>{character}</div>}
      {errormessage && <p>{errormessage}</p>}
       </>
    )
}