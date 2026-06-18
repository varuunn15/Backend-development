import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);

  function fetchNotes() {
    axios.get("http://localhost:3000/api/notes")
      .then((res) => {
        setNotes(res.data.notes);
      });
  }

  useEffect(() => {
    fetchNotes();
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    const { title, description } = e.target.elements;

    axios.post("http://localhost:3000/api/notes", {
      title: title.value,
      description: description.value,
    })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }

  function handleDelete(noteId) {
    axios.delete(`http://localhost:3000/api/notes/${noteId}`)
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }

  function handleUpdate(note) {
    const newTitle = prompt("Enter new title", note.title);
    const newDescription = prompt(
      "Enter new description",
      note.description
    );

    axios.patch(`http://localhost:3000/api/notes/${note._id}`, {
      title: newTitle,
      description: newDescription
    })
      .then((res) => {
        console.log(res.data);
        fetchNotes();
      });
  }

  return (
    <>
      <form className="note-create-form" onSubmit={handleSubmit}>
        <input name="title" type="text" placeholder="Enter title" />
        <input name="description" type="text" placeholder="Enter description" />
        <button>Create Note</button>
      </form>

      <div className="notes">
        {notes.map((note) => (
          <div className="note" key={note._id}>
            <h1>{note.title}</h1>
            <p>{note.description}</p>

            <button onClick={() => handleUpdate(note)}>
              Update
            </button>

            <button onClick={() => handleDelete(note._id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </>
  );
};

export default App;