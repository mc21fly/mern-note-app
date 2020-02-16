import React, { useState } from 'react';
import {stateToHTML} from 'draft-js-export-html';
import { EditorState } from 'draft-js';
import axios from 'axios';
import $ from 'jquery';

import NoteEditor from './editor.component';

export default function CreateNote() {

    function clickHandler(recivedNote) {
        console.log(recivedNote)

        if((recivedNote.title !== undefined || '') && (recivedNote.description !== undefined || '')) {
            axios.post('http://localhost:3300/create', recivedNote)
            .then(result => {
                window.history.back();
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    return (
        <div className="container p-1">
            <div className="alert alert-secondary">
                Create new note
            </div>

            <NoteEditor
                from={'Create'}
                clickHandler={(recivedNote) => clickHandler(recivedNote)}
            />

        </div>
    )
}