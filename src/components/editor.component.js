import React, { Component, createRef } from 'react';
import { Editor, RichUtils, EditorState, ContentState, convertFromHTML } from 'draft-js';
import $ from 'jquery';
import './Editor.scss';
import { stateToHTML } from 'draft-js-export-html';

export default class NoteEditor extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            editorState: EditorState.createEmpty(),
            myNoteEditor: undefined,
            from: props.from,
            note: this.props.note
                ? {
                    id: this.props.note._id,
                    title: this.props.note.title,
                    description: this.props.note.description,
                    postDate: this.props.note.postDate,
                    editDate: this.props.note.editDate
                }
                
                : {
                    title: undefined,
                    description: undefined,
                    postDate: undefined,
                    editDate: undefined
                }
        };

        this.editor = createRef();
    }

    componentDidMount() {
        if(this.state.from === 'Edit') {
            function setEditorState(html) {
                const blocksFromHTML = convertFromHTML(`${html}`);
                const state = ContentState.createFromBlockArray(
                    blocksFromHTML.contentBlocks,
                    blocksFromHTML.entityMap
                )
            
                return EditorState.createWithContent(state);
            }
            this.onChange(setEditorState(this.state.note.description))
            $('#note-title').val(this.state.note.title)
        } else {
            
        }
    }

    onChange(editorState) {
        this.setState({editorState})
    }

    makeBold() {
        this.onChange(RichUtils.toggleInlineStyle(
            this.state.editorState,
            'BOLD'
        ))
    }

    makeItalic() {
        this.onChange(RichUtils.toggleInlineStyle(
            this.state.editorState,
            'ITALIC'
        ))
    }

    makeUnderline() {
        this.onChange(RichUtils.toggleInlineStyle(
            this.state.editorState,
            'UNDERLINE'
        ))
    }

    focusEditor() {
        this.editor.current.focus();
    }

    changeTitle(title) {
        this.setState(p => ({
            ['note']: {
                id: p.note.id,
                title: title,
                description: p.note.description,
                postDate: this.state.from !== 'Edit' ? this.setDate() : p.note.postDate,
                editDate: this.state.from !== 'Edit' ? undefined : this.setDate()
            }
        }))
    }

    changeDescription(editorState) {
        this.setState(p => ({
            ['note']: {
                id: p.note.id,
                title: p.note.title,
                description: stateToHTML(editorState.getCurrentContent()),
                postDate: this.state.from !== 'Edit' ? this.setDate() : p.note.postDate,
                editDate: this.state.from !== 'Edit' ? undefined : this.setDate()
            }
        }))
    }

    setDate() {
        const date = new Date();

        const D = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        const M = date.getMonth() < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
        const Y = date.getFullYear();

        const h = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
        const m = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();

        return `${D}/${M}/${Y} at ${h > 23 ? '00' : h}:${m}`;
    }

    handleClick() {
        this.props.clickHandler(this.state.note)
    }

    render() {
        return(
            <form>
                <div className="form-group">
                    <label className="text-muted">Title</label>
                    <input type="text" className="form-control" id="note-title" onChange={() => this.changeTitle($('#note-title').val())} />
                </div>

                <label className="text-muted">Your note</label>
                
                <div id="editor" className="editor" onClick={this.focusEditor.bind(this)}>
                    <Editor ref={this.editor} editorState={this.state.editorState} onChange={(editorState) => {this.onChange(editorState) ;this.changeDescription(this.state.editorState)}} />
                </div>

                <div className="container-fluid p-0">
                    <span onClick={this.makeBold.bind(this)} className="badge badge-secondary h1 mr-1" style={{cursor: 'pointer'}}><i className="fas fa-bold"></i></span>
                    <span onClick={this.makeItalic.bind(this)} className="badge badge-secondary h1 mr-1" style={{cursor: 'pointer'}}><i className="fas fa-italic"></i></span>
                    <span onClick={this.makeUnderline.bind(this)} className="badge badge-secondary h1 mr-1" style={{cursor: 'pointer'}}><i className="fas fa-underline"></i></span>
                    <span style={{fontSize: '0.7rem'}} className="text-muted">Mark text and then press button to style it</span>
                </div>

                <div className="form-group d-flex justify-content-center">
                    <span onClick={this.handleClick.bind(this)} className="btn btn-primary">{this.state.from} your note</span>
                </div>
            </form>
        )
    }
}