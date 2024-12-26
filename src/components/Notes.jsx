import React from "react";

import '../styles/Notes.css'

function Notes({note, onDelete}) {

    const formatDate = new Date(note.created_at).toLocaleDateString("en-US")

    return (
        <div className="container">
            <div className="notes-container">
                <p className="note-title"><span>Title :</span> { note.title }</p>
                <p className="note-desc"><span>Description :</span> { note.description }</p>
                <p className="note-date"><span>Date :</span> { formatDate }</p>
                <button className="delete-btn" onClick={() => onDelete(note.id)} > Delete </button>
            </div>
        </div>
    )
}

export default Notes