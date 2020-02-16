import React, { useState } from 'react';
import {stateToHTML} from 'draft-js-export-html';
import { EditorState } from 'draft-js';
import axios from 'axios';
import $ from 'jquery';

import NoteEditor from './editor.component';

export default function CreateNote() {

    const [note, setNote] = useState({
        title: undefined,
        description: undefined,
        postDate: setPostDate(),
        editDate: undefined
    })

    function clickHandler() {
        setNote({
            asd: 'asd'
        })
        if((note.title !== undefined || '') && (note.description !== undefined || '')) {
            axios.post('http://localhost:3300/create', note)
            .then(result => {
                window.history.back();
            })
            .catch(error => {
                console.log(error)
            })
        }
    }

    function changeTitle() {
        setNote(prev => {
            return {
                title: $('#note-title').val(),
                description: prev.description,
                postDate: prev.postDate
            }
        })
    }

    function changeDescription(content) {
        setNote(prev => {
            return {
                title: prev.title,
                description: stateToHTML(content.getCurrentContent()),
                postDate: prev.postDate
            }
        })
    }

    function setPostDate() {
        const date = new Date();

        const D = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const M = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const Y = date.getFullYear();

        const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        const m = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

        return `${D}/${M}/${Y} at ${h > 23 ? '00' : h}:${m}`;
    }

    return (
        <div className="container p-1">
            <div className="alert alert-secondary">
                Create new note
            </div>

            <NoteEditor
                from={'Create'}
                clickHandler={clickHandler}
                changeTitle={changeTitle}
                changeDescription={(content) => changeDescription(content)}
                editorStateHandler={EditorState.createEmpty()}
            />

        </div>
    )
}