import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle';

import '@fortawesome/fontawesome-free/css/all.css';

import NotesList from './components/notes-list.component';
import EditNote from './components/edit-note.component';
import CreateNote from './components/create-note.component';

export default function App() {

  const [NON, setNON] = useState();

  useEffect(() => {
    document.title = NON === undefined || 0 ? `Note.app` : `Note.app [${NON}]`
  })

  function setNumberOfNotes(data) {
    setNON(data.length);
  }

  return (
    <Router>
      <div className="container-fluid bg-light mb-3">
        <div className="container p-0">
          <nav className="navbar p-1 d-flex">
            <span className="navbar-brand">
              <h1><span className="badge badge-secondary">note<code style={{color: '#007bff'}}>.app</code></span></h1>
            </span>

            <ul className="nav nav-pills d-flex">
              <li className="nav-item">
                <Link className="nav-link" to="/">Your notes <span className="badge badge-primary">{NON}</span></Link>
              </li>

              <li className="nav-item">
                <Link className="btn btn-primary" to="/create">Create note</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>

        <Route path="/" exact>
          <NotesList f={(numberOfNotes) => setNumberOfNotes(numberOfNotes)}/>
        </Route>
        <Route path="/edit/:id" component={EditNote} />
        <Route path="/create" component={CreateNote} />
    </Router>
  );
}
