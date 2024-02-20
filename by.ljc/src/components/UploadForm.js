import React, { useState } from 'react'
import ProgressBar from './ProgressBar';

const UploadForm = () => {
    const[file, setFile] = useState(null);
    const[error, setError] = useState(null);

    const allowTypes = ['image/png', 'image/jpeg'];

    const changeHandler = (e) => {
        let selected = e.target.files[0];
        
        if (selected && allowTypes.includes(selected.type)) {
            setFile(selected);
            setError("");
        }
        else {
            setFile(null);
            setError("Please select a valid file type (png or jpeg)");
        }
    }
  return (
    <form>
      <label>
        <input type="file" onChange={changeHandler} />
        <span>+</span>
      </label>
      <div className="output">
        { error && <div className="error">{ error }</div>}
        { file && <div>{ file.name }</div> }
        { file && <ProgressBar file={file} setFile={setFile} /> }
      </div>
    </form>
  )
}

export default UploadForm;