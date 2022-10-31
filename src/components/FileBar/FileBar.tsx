import React from 'react'
import './FileBar.css'

interface Props {
    selectedFile: {
        fileName: string,
        fileBody: string,
        id: string,
    }
}

function FileBar({selectedFile} : Props) {
    return (
        <div className='fileBar'>
                    {selectedFile.fileName}
                    <button>Download</button>
        </div>
    )
}

export default FileBar