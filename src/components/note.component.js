import React, { useState, useEffect } from 'react';
import axios from 'axios';
import $ from 'jquery';

export default function Note(props) {

    const [style, setStyle] = useState();

    function handleMouseOver() {
        setStyle({
            color: 'tomato',
            cursor: 'pointer',
            transition: 'color 0.2s'
        })
    }

    function handleMouseOut() {
        setStyle({
            color: 'black',
            cursor: 'pointer',
            transition: 'color 0.2s'
        })
    }

    function handleDelete() {
        axios.delete(`http://localhost:3300/${props.id}`)
            .then(result => {
                console.log(result)
                window.location.reload();
            })
            .catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        $('#description').html(props.description)

    }, [props.description]) 

    return (
        <div className="col-12 col-lg-4 col-md-6 p-1 d-flex">
            <div className="card col">
                <div className="card-body d-flex flex-column">
                    <div className="container p-0 d-flex justify-content-between">
                        <h5 className="card-title font-weight-bold">{props.title}</h5>
                        <i onClick={handleDelete} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} className="fas fa-trash" style={style}></i>
                    </div>

                    <h6 className="card-subtitle mb-2 text-muted" style={{fontSize: '0.9rem'}}>{props.postDate}</h6>
                    
                    <p id="description" style={{maxHeight: '50px'}} className="card-text overflow-hidden mt-2 pt-2"></p>

                    <div className="container p-0 d-flex align-items-end justify-content-between">
                        <span className="text-muted" style={{fontSize: '0.75rem'}}>{!props.editDate ? "" : `Last edited: ${props.editDate}`}</span>
                        <span type="button" onClick={props.onClick.bind(this, props)} className="btn btn-primary">Details</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
