import React, { useState } from 'react';
import path from 'path';
import axios from 'axios';

import NoteEditor from './editor.component';

export default function EditNote() {

    // eslint-disable-next-line
    const [noteToSend, setNoteToSend] = useState(path.basename(window.location.href))

    function clickHandler(recivedNote) {
            console.log(recivedNote)
        axios.post(`http://localhost:3300/edit/${recivedNote.id}`, recivedNote)
            .then(result => window.history.back())
            .catch(error => console.log(error))
    }

    return (
        <div className="container p-1">
            <div className="alert alert-secondary">
                Edit your note
            </div>

            <NoteEditor
                from={'Edit'}
                clickHandler={clickHandler}
                note={JSON.parse(localStorage.getItem(`${noteToSend}`))}
            />

        </div>
    )
}