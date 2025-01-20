import { useState, useEffect } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import ChatBox from "../components/Chatbox";
import "../styles/note.css"; 
import WordBank from "../components/Wordbank";

function Note({ note, onDelete }) {
  const formattedDate = new Date(note.created_at).toLocaleString("en-US");

  return (
    <div className="note-container">
      <p className="note-title">{note.title}</p>
      <p className="note-content">{note.content}</p>
      <p className="note-date">{formattedDate}</p>
      <button className="delete-button" onClick={() => onDelete(note.id)}>
        Delete Note
      </button>
    </div>
  );
}

function Home() {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/logout");
  };

  const handleNavigateSettings = () => {
    navigate("/about");
  };


  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = () => {
    api
      .get("/api/notes/")
      .then((res) => res.data)
      .then((data) => {
        setNotes(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteNote = (id) => {
    api
      .delete(`/api/notes/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("note was deleted");
        else alert("failed to delete note");
        getNotes();
      })
      .catch((error) => alert(error));
  };

  const createNote = (e) => {
    e.preventDefault();
    api
      .post("/api/notes/", { content, title })
      .then((res) => {
        if (res.status === 201) alert("note created");
        else alert("failed to make note");
        getNotes();
      })
      .catch((err) => alert(err));
  };

  return (
    <div>
      <div className="top-left-buttons">
        
        <button onClick={handleNavigateSettings}>How to Use</button>
      </div>

      <WordBank />
      <div>
        <h2>Notes</h2>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} />
        ))}
      </div>

      <h4>New Note!</h4>
      <form className="note-form" onSubmit={createNote}>
        <label className="note-label" htmlFor="title">
          Title:
        </label>
        <br />
        <input
          type="text"
          id="title"
          name="title"
          required
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <br />
        <label className="note-label" htmlFor="content">
          Content:
        </label>
        <br />
        <textarea
          id="content"
          name="content"
          required
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <br />
        <input className="note-submit" type="submit" value="Create Note" />
      </form>

      <button className="logout-button" onClick={handleLogout}>Logout</button>

      <ChatBox />
    </div>
  );
}

export default Home;
