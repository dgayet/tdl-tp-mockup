import React from 'react'
import './File.css'

interface file {
    fileName: string,
    fileBody: string,
    id: string
}

interface Props {
    file: file,
    onSelect: Function,
    onDelete: Function,
    selected: boolean,
}

function File({file, onSelect, onDelete, selected} : Props) {
    const onClick = () => {
        onSelect(file.id);
    }

    return (
        <div className="fileContainer">
            <button className={`file ${selected? 'selected': ''}`} onClick={() => onClick()}>{file.fileName}</button>
        </div>

    )
}

export default File