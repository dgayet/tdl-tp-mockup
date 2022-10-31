import React from 'react'
import File from '../File/File'
import './Sidebar.css'

interface data {
    fileName: string,
    fileBody: string,
    id: string
}

interface Props {
    files: data[];
    onClick: Function,
    onDelete: Function,
    selected: string,
}

function Sidebar({files, onClick, onDelete, selected} : Props) {
    return (
        <div className='sidebar'>
            <div className="files">Files</div>
            {
            files.map((file: data) => (
                <File
                    selected={selected === file.id ? true : false} 
                    key={file.id}
                    file={file} 
                    onDelete={onDelete}
                    onSelect={onClick}/>
            ))}
        </div>
    )
}

export default Sidebar