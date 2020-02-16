import React, { Component, createRef } from 'react';
import { Editor, RichUtils } from 'draft-js';
import './Editor.scss';

export default class NoteEditor extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            editorState: this.props.editorStateHandler,
            from: props.from
        };

        this.editor = createRef();
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

    render() {
        return(
            <form>
                <div className="form-group">
                    <label for="note-title text-muted">Title</label>
                    <input type="text" className="form-control" id="note-title" onChange={() => this.props.changeTitle()} />
                </div>

                <label for="editor text-muted">Your note</label>
                
                <div id="editor" className="editor" onClick={this.focusEditor.bind(this)}>
                    <Editor ref={this.editor} editorState={this.state.editorState} onChange={(editorState) => {this.onChange(editorState) ;this.props.changeDescription(this.state.editorState)}} />
                </div>

                <div className="container-fluid p-0">
                    <span onClick={this.makeBold.bind(this)} className="badge badge-secondary h1 mr-1" style={{cursor: 'pointer'}}><i className="fas fa-bold"></i></span>
                    <span onClick={this.makeItalic.bind(this)} className="badge badge-secondary h1 mr-1" style={{cursor: 'pointer'}}><i className="fas fa-italic"></i></span>
                    <span onClick={this.makeUnderline.bind(this)} className="badge badge-secondary h1 mr-1" style={{cursor: 'pointer'}}><i className="fas fa-underline"></i></span>
                    <span style={{fontSize: '0.7rem'}} className="text-muted">Mark text and then press button to style it</span>
                </div>

                <div className="form-group d-flex justify-content-center">
                    <span onClick={() => this.props.clickHandler()} className="btn btn-primary">{this.state.from} your note</span>
                </div>
            </form>
        )
    }
}