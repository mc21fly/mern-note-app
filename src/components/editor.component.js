import React, { useRef, useState, useEffect } from 'react';
import { Editor, RichUtils, EditorState, ContentState, convertFromHTML } from 'draft-js';
import { stateToHTML } from 'draft-js-export-html';
import $ from 'jquery';

import './Editor.scss';

export default function NoteEditor(props) {

    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    // eslint-disable-next-line
    const [from, setFrom] = useState(props.from);
    const [note, setNote] = useState(props.note
            ? {
                id: props.note._id,
                title: props.note.title,
                description: props.note.description,
                postDate: props.note.postDate,
                editDate: props.note.editDate
            }
            : {
                title: undefined,
                description: undefined,
                postDate: undefined,
                editDate: undefined
            }
        )
    const editor = useRef();

    useEffect(() => {
        if(from === 'Edit') {
            function setEditorState(html) {
                const blocksFromHTML = convertFromHTML(`${html}`);
                const state = ContentState.createFromBlockArray(
                    blocksFromHTML.contentBlocks,
                    blocksFromHTML.entityMap
                )
            
                return EditorState.createWithContent(state);
            }
            console.log(note)
            onChange(setEditorState(note.description))
            $('#note-title').val(note.title)
        }
        // eslint-disable-next-line
    }, [ ])

    function onChange(editorState) {
        setEditorState(editorState)
    }

    function makeBold(e) {
        e.preventDefault()
        onChange(RichUtils.toggleInlineStyle(
            editorState,
            'BOLD'
        ))
    }

    function makeItalic(e) {
        e.preventDefault()
        onChange(RichUtils.toggleInlineStyle(
            editorState,
            'ITALIC'
        ))
    }

    function makeUnderline(e) {
        e.preventDefault()
        onChange(RichUtils.toggleInlineStyle(
            editorState,
            'UNDERLINE'
        ))
    }

    function handleKeyCommand(command, editorState) {
        const newState = RichUtils.handleKeyCommand(editorState, command)

        if(newState) {
            onChange(newState)
            return 'handled';
        }

        return 'not-handled';
    }

    function focusEditor() {
        editor.current.focus();
    }

    function setTitle(title) {
        setNote(p => ({
                id: p.id,
                title: title,
                description: p.description,
                postDate: from !== 'Edit' ? setDate() : p.postDate,
                editDate: from !== 'Edit' ? undefined : setDate()
            }
        ))
    }

    function setDescription(editorState) {
        setNote(p => ({
                id: p.id,
                title: p.title,
                description: stateToHTML(editorState.getCurrentContent()),
                postDate: from !== 'Edit' ? setDate() : p.postDate,
                editDate: from !== 'Edit' ? undefined : setDate()
            }
        ))
    }

    function setDate() {
        const date = new Date();

        const D = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const M = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const Y = date.getFullYear();

        const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        const m = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

        return `${D}/${M}/${Y} at ${h > 23 ? '00' : h}:${m}`;
    }

    function handleClick() {
        props.clickHandler(note);
    }
    
    return (
        <form>
            <div className="form-group">
                <label className="text-muted">Title</label>
                <input type="text" className="form-control" id="note-title" onChange={() => setTitle($('#note-title').val())} />
            </div>

            <label className="text-muted">Your note</label>
            
            <div id="editor" className="editor" onClick={focusEditor}>
                <Editor ref={editor}  editorState={editorState} handleKeyCommand={handleKeyCommand} onChange={(editorState) => { onChange(editorState); setDescription(editorState) }} />
            </div>

            <div className="container-fluid p-0">
                <span onMouseDown={(e) => {makeBold(e)}} className="badge badge-secondary h1 mr-1" style={{cursor: 'pointer'}}><i className="fas fa-bold"></i></span>
                <span onMouseDown={(e) => makeItalic(e)} className="badge badge-secondary h1 mr-1" style={{cursor: 'pointer'}}><i className="fas fa-italic"></i></span>
                <span onClick={(e) => makeUnderline(e)} className="badge badge-secondary h1 mr-1" style={{cursor: 'pointer'}}><i className="fas fa-underline"></i></span>
                <span style={{fontSize: '0.7rem'}} className="text-muted"><b>CTRL + B</b>, <i>CTRL + I</i>, <u>CTRL + U</u></span>
            </div>

            <div className="form-group d-flex justify-content-center">
                <span onMouseOver={() => setDescription(editorState)} onClick={handleClick} className="btn btn-primary">{from} your note</span>
            </div>
        </form>
    )
}