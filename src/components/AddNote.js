import React, { useState,useContext } from 'react'
import  noteContext from "../context/notes/noteContext"

const AddNote = (props) => {
    const context = useContext(noteContext);
    const {addNote} = context;
    const [note,setNote] = useState({title:"",description:"",tag:""});

    const handleClick = (e) =>{
        e.preventDefault() 
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
        props.showAlert("Notes Added Successfully","success")

    }
    const onChange = (e) =>{
        setNote({...note,[e.target.name]:e.target.value})
    }
  return (
    <div>
      <div className="container my-3">
         <h2>Add a Note</h2>
         <form className='my-3'>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input required type="text" minLength={5} className="form-control" value={note.title} id="title" name="title" aria-describedby="emailHelp" onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <input required minLength={5} type="text" className="form-control" value={note.description} id="description" name="description" onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Tag</label>
            <input required type="text"  minLength={5} className="form-control" value={note.tag} id="tag" name="tag" onChange={onChange}/>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
        </div>
    </div>
  )
}

export default AddNote
