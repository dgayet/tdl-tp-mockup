import React from 'react'
import "./Editor.css"

interface Props {
    prevInput: string,
    placeHolder: string,
    onChange: React.ChangeEventHandler,
    onKeyDown: Function
}

function Editor({prevInput, placeHolder, onChange, onKeyDown}: Props) {
    return (
        <textarea
            className="editor"
            placeholder={placeHolder}
            onChange={onChange}
            value={prevInput}
        ></textarea>
    )
}

export default Editor