import React, { Component } from 'react'
import axios from 'axios'
import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import '../App.css'

export default class NotesList extends Component {

    state = {
        notes: []
    }

    async componentDidMount() {
        this.getNotes();
    }

    getNotes = async () => {
        const res = await axios.get('http://localhost:4000/api/notes')
        this.setState({
            notes: res.data
        });
    }

    deleteNote = async (noteId) => {
        await axios.delete('http://localhost:4000/api/notes/' + noteId);
        this.getNotes();
    }
    
    render() {
        return (
            <div className="row">
                {
                    this.state.notes.map(note => (
                        <div className="col-md-4 p-2" key={note._id}>
                            <div className="card" id="notes">
                                <div className="card-header d-flex justify-content-between">
                                    <h5>{note.title}</h5>
                                    <Link to={"/edit/" + note._id} className="btn btn-secondary">
                                        <i className="material-icons">
                                            Edit</i>
                                    </Link>
                                </div>
                                <div className="card-body">
                                    <p>
                                        {note.content}
                                    </p>
                                    <p>
                                        Author: {note.author}
                                    </p>
                                    <p>
                                        {format(note.date)}
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <button className="btn btn-danger" onClick={() => this.deleteNote(note._id)}>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        )
    }
}