import React, { useState } from 'react'
import './FileCreator.css'

interface Props {
    onSubmit : Function
}

function CreateFile({onSubmit} : Props) {
    const [name, setName] = useState("");
    const Submit = () => {
        onSubmit(name);
        setName("");
    }
    return (
        <form onSubmit={Submit}>
             <label>
                <span>Name:</span> 
                <input type="text" name="name" onChange={(e) => setName(e.target.value)}/>
             </label>
            <input className="submitBtn" type="submit" value="New"/>
        </form>
    )
}

export default CreateFile