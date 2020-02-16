import React, { useState, useEffect } from 'react';
import { EditorState, convertFromHTML, ContentState } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import path from 'path';
import axios from 'axios';
import $ from 'jquery';
import NoteEditor from './editor.component';
import './Editor.scss';


export default function EditNote() {

    // eslint-disable-next-line
    const [noteId, setNoteId] = useState(path.basename(window.location.href));
    const [note, setNote] = useState({
        title: undefined,
        description: undefined
    });

    const [noteEditor, setNoteEditor] = useState();

    useEffect(() => {
        axios.get(`http://localhost:3300/edit/${noteId}`)
            .then(result => {
                setNote({
                    title: result.data.title,
                    description: result.data.description,
                    postDate: result.data.postDate
                    })
                console.log(note)
                $('#note-title').val(result.data.title)
            })
            .catch(e => console.log(e))
        // eslint-disable-next-line
    }, [])

    useEffect(() => {
        function setEditorState() {
            const html = note.description
            const blocksFromHTML = convertFromHTML(`${html}`);
            const state = ContentState.createFromBlockArray(
                blocksFromHTML.contentBlocks,
                blocksFromHTML.entityMap
            )
        
            return EditorState.createWithContent(state);
        }
        setNoteEditor(
            <NoteEditor
                from={'Edit'}
                clickHandler={clickHandler}
                changeTitle={changeTitle}
                changeDescription={(content) => changeDescription(content)}
                editorStateHandler={setEditorState()}
            />
        )
        // eslint-disable-next-line
    }, [note])


    function clickHandler() {
        axios.post(`http://localhost:3300/edit/${noteId}`, note)
            .then(result => window.history.back())
            .catch(error => console.log(error))
    }

    function changeTitle() {
        setNote(prev => {
            return {
                title: $('#note-title').val(),
                description: prev.description,
                postDate: prev.postDate,
                editDate: setEditDate()
            }
        })
    }

    function changeDescription(content) {
        setNote(prev => {
            return {
                title: prev.title,
                description: stateToHTML(content.getCurrentContent()),
                postDate: prev.postDate,
                editDate: setEditDate()
            }
        })
    }

    function setEditDate() {
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
                Edit your note
            </div>

        {noteEditor}

        </div>
    )
}