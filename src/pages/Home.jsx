import { useState, useEffect } from "react" 
import { useNavigate } from "react-router-dom";

import api from "../api"
import Notes from "../components/Notes";
import '../styles/Home.css'

function Home() {

    const [notes, setNotes] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const [create, setCreate] = useState(false);

    const navigate = useNavigate()

    useEffect(() => {
        getNotes();
    }, [])

    const getNotes = () => {
        api.get("/api/notes/")
            .then((res) => res.data)
            .then((data) => {setNotes(data); })
            .catch((err) => alert(err));
    }

    const deleteNote = (id) => {
        api.delete(`/api/notes/delete/${id}/`).then((res) => {
            if(res.status === 204) {
                alert("Note deleted successfully")
            }
            else {
                alert("Failed to delete the Note")
            }
            getNotes();
        }).catch((err) => alert(err));
    }

    const emptyVar = () => {
        setTitle("")
        setDescription("")
        setCreate(!create)
    }

    const createNote = (e) => {
        e.preventDefault()
        api.post("/api/notes/", {title, description} )
            .then((res) => {
                if(res.status === 201) {
                    alert("Note created successfully")
                }
                else {
                    alert("Failed to create the Note")
                }
                getNotes();
                setCreate(!create)
                setTitle("")
                setDescription("")
            })
            .catch((err) => alert(err));
    }

    const Logout = () => {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <div className="home">
            <div className="nav">
                <h2 className="notes">Notes</h2>
                <div className="nav-btn">
                    <button className="create-btn" onClick={() => setCreate(!create)}>Create</button>
                    <button className="logout" onClick={Logout}>Logout</button> 
                </div>
            </div>

            {notes.map((note) => <Notes note={note} onDelete={deleteNote} key={note.id} />)}

            { create &&  <div className="create-form">
                <form className="input-note">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required />
                    <br />
                    <label htmlFor="description">Description: </label>
                    <textarea name="description" id="description" value={description} onChange={(e) => setDescription(e.target.value)} required ></textarea>
                    <br />
                    
                    <div className="form-btn">
                        <button type="button" onClick={createNote} className="submit-btn">Submit</button>
                        <button type="button" onClick={emptyVar} className="cancel-btn">Cancel</button>
                    </div>
                </form>
            </div>}
        </div>
    )
}

export default Home