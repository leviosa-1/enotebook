import React, {useContext} from 'react'
import  noteContext from "../context/notes/noteContext"

const Noteitem = (props) => {
    const context = useContext(noteContext);
    const {deleteNote} = context;
    const {note,updateNote} = props;



  return (
    <div className="col-md-3 ">
        <div className="card my-3">
                <p className="cookieHeading">{note.title}</p>
                <p className="cookieDescription">{note.description}</p>

                <div className="buttonContainer">
                    <button className="acceptButton" onClick={()=>{
                      deleteNote(note._id);
                      props.showAlert("Notes deleted Successfully","success")
                    }}>Delete</button>
                    <button className="acceptButton" onClick={()=>{
                      updateNote(note);
                      
                    }}>Edit</button>
                </div>
        </div>
    </div>
  )
}

export default Noteitem
