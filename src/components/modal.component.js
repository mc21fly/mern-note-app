import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

import $ from 'jquery';

export default function Modal(props) {

    function hideModal() {
        $('#detailsModal').modal('hide');
    }

    useEffect(() => {
        $('#description-modal').html(props.data.description)
    })

    return (
        <div className="modal fade" id="detailsModal" tabIndex="-1" role="dialog" aria-hidden="true">
            <div className="modal-dialog modal-dialog-scrollable" role="document">
                <div className="modal-content">
                    <div className="modal-header d-flex">
                        <h5 className="modal-title font-weight-bold">{props.data.title}</h5><br /><h5 className="modal-title text-muted mt-2 ml-2" style={{fontSize: '0.75rem'}}> {props.data.postDate}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div id="description-modal" className="modal-body text-justify"></div>
                    
                    <div className="modal-footer">
                        <span className="text-muted" style={{fontSize: '0.75rem'}}>{!props.data.editDate ? "" : `Last edited: ${props.data.editDate}`}</span>
                        <Link className="btn btn-primary" to={`/edit/${props.data.id}`} onClick={hideModal}>Edit</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}