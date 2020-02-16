import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import $ from "jquery";
import axios from 'axios';
import Note from './note.component';
import Modal from './modal.component';

export default function NotesList(props) {

    const [data, setData] = useState([ ]);
    const [modal, setModal] = useState({ });

    function viewDetails(details) {
        setModal(details);
        $('#detailsModal').modal('show');
    }

    useEffect(() => {
        props.f(data);
    })

    useEffect(() => {
        axios.get('http://localhost:3300')
            .then(result => {
                if(result.data.length !== 0) {
                    localStorage.clear();
                    result.data.forEach(note => {
                        setData(prevState => [
                            <Note
                                key={note._id}
                                onClick={(details) => viewDetails(details)}
                                id={note._id}
                                title={note.title}
                                description={note.description}
                                postDate={note.postDate}
                                editDate={note.editDate} />
                            , ...prevState])
                        localStorage.setItem(`${note._id}`, JSON.stringify(note));
                    })
                } else {
                    localStorage.clear();
                    setData(<h4 className="font-weight-bold">There is no notes. <Link className="btn btn-lg btn-primary" to='/create'>Create</Link> your first one.</h4>)
                }
            })
            .catch(error => {
                console.log(error)
            })
      }, [ ]);

    return (
        <div className="container">
            <div className="row">
                {data}
            </div>

            <Modal data={modal}/>
        </div>
    )
}