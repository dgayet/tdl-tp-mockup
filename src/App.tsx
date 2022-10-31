import React from 'react';
import { useState, useEffect } from 'react';
import Editor from './components/Editor/Editor'
import FileUploader from './components/FileUploader/FileUploader';
import Sidebar from './components/Sidebar/Sidebar'
import FileBar from './components/FileBar/FileBar';
import FileCreator from './components/FileCreator/FileCreator'
import './App.css';
import { create } from 'domain';
import { stringify } from 'querystring';

const file_server = 'http://localhost:5001/files'

interface file {
  fileName : string,
  fileBody: string,
  id: string
}

function App() {
  // const [language, setLanguage] = useState("");
  // const [theme, setTheme] = useState("");
  const [input, setInput] = useState("");
  const [files, setFiles] = useState<file[]>([]);
  const [isFileSelected, setFileSelected] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<file>({fileName:"", fileBody:"", id:""});

  useEffect(() => {
    const getFiles = async() => {
      const filesFromServer = await fetchFiles();
      setFiles(filesFromServer);
    }

    getFiles();
  }, [])

  const fetchFiles = async () => {
    const res = await fetch(file_server);
    const data = await res.json();
    
    return data;
  }

  const fetchFile = async (id: string) => {
    const res = await fetch(`${file_server}/${id}`);
    const data = await res.json();

    return data;
  }

  const createFile = async (fileName: string) => {
    const filesFS = await fetchFiles();
    const length = filesFS.length;

    const newFile : file = {
      fileName: fileName,
      fileBody: "",
      id: length+1
    }

    const res = await fetch(file_server,
      {
        method: 'POST',
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(newFile)
      })
    
    const data = await res.json();

    setFiles([...files,newFile]);
    setFileSelected(true);
    setSelectedFile(data.id);
  }

  const addFile = async (file: File) => {
    const body = await readFileAsText(file);

    const data = {
        fileName: file.name,
        fileBody: body};

    const res = await fetch(
        file_server, 
        {
            method: 'POST',
            headers: {'Content-type' : 'application/json'},
            body: JSON.stringify(data)
        })
    const newFile = await res.json();
    setFiles([...files, newFile]);
  }

  const openFile = async (id: string) => {
    const file = await fetchFile(id);
    setSelectedFile(file)
    if (file) {
      setInput(file.fileBody)
      setFileSelected(true);
    }
  }

  const updateFile = async (fileContent: string) => {
    if (!selectedFile) return;
    const data : file = {
      fileName: selectedFile.fileName,
      fileBody: fileContent,
      id: selectedFile.id
    }
    const res = await fetch(`${file_server}/${data.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-type' : 'application/json'
        },
        body: JSON.stringify(data)
      }
      )
    setInput(fileContent);
  }

  const downloadFile = () => {
    console.log('download file');
  }

  const deleteFile = () => {
    console.log('deleted file');
  }

  const readFileAsText = (file: File) => new Promise((resolve, eject) => {
    const reader = new FileReader();
    reader.onload = ({target}) => {
        if (target) resolve(target.result);
        else eject();
    }
    reader.readAsText(file);
  })

  

  return (
    <div className="App">
      <Sidebar files={files}
               onClick={openFile}
               onDelete={deleteFile}
               selected={selectedFile ? selectedFile.id : ''}/>
      <div className="container">
        <div className="ControlsBox">
          <FileUploader onSubmit={addFile}/>
          <FileCreator onSubmit={createFile}/>
        </div>
        <div className="PanelsBox"> 
          {selectedFile.fileName ? <><FileBar 
            selectedFile={selectedFile}
          />
          <Editor
            prevInput={input}
            placeHolder={"start coding here..."}
            onChange={(e : React.ChangeEvent<HTMLInputElement> ) =>
              updateFile(e.currentTarget.value)}
            onKeyDown={() => {}}
          /></> : <></>}
        </div>
      </div>
    </div>
  );
}

export default App;
