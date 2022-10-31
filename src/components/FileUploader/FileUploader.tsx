import React from 'react'
import {useState} from 'react'
import './FileUploader.css'

interface Props {
    onSubmit: Function,
}


function FileUploader({onSubmit} : Props) {
    const [file, setFile] = useState<File>();
    const [isSelected, setSelected] = useState<boolean>(false);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) return;

        const files = e.target.files;
        setFile(e.target.files[0]);
    }

    const readFileAsText = (file: File) => new Promise((resolve, eject) => {
        const reader = new FileReader();
        reader.onload = ({target}) => {
            if (target) resolve(target.result);
            else eject();
        }
        reader.readAsText(file);
    })

    const Submit = async (e : React.MouseEvent) => {
        if (!file) return;

        e.preventDefault();

        onSubmit(file);
    }

    return (
        <div className='fileUploader'>
            <input 
                type='file'
                name='file' 
                onChange=
                    {
                        (e: React.ChangeEvent<HTMLInputElement>)=>onChange(e)
                    }
                accept='.txt,.md,.html,.css,.js,.ts,.py'
            />
            <button onClick={Submit}>Submit</button>
        </div>
    )
}

export default FileUploader