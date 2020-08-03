import React, { useState } from 'react';

const UploadScript = () => {

  const [title, setTitle] = useState('');
  const [pathToFile, setPath] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const body = {
        title,
        pathToFile
      };
      if (title && pathToFile) {
        const upload = await fetch(`http://localhost:3000/upload`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        })
        setTitle('');
        setPath('');
      }
      else {
        window.alert("Please fill out both the Title of Video and the Upload Path");
      }
    } catch (error) {
      console.error("UploadScript.tsx/handleSubmit error: ", error.message);
    }
  };

  return (
    <>
    <hr></hr>
    <form className="form" onSubmit={handleSubmit}>
      <label>
        Upload Path:  
        <input type="text" name="upload_path" onChange={(e) => setPath(e.target.value)}/>
      </label>
      <label>
        Title of Video:  
        <input type="text" name="title" onChange={(e) => setTitle(e.target.value)}/>
      </label>
      <input type="submit" value="Submit" />
    </form>
    <p>Example file path: /Users/username/Downloads/videoName.mp4</p>
    </>
  )
};

export default UploadScript;