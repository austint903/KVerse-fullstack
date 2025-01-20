import { useState, useEffect } from "react";
import api from "../api";
import "../styles/Wordbank.css"; 

function WordRow({ word, onDelete }) {
  const formattedDate = new Date(word.created_at).toLocaleString("en-US");
  return (
    <div className="word-row">
      <span className="word-cell">Korean: {word.korean_word}</span>
      <span className="word-cell">English: {word.english_word}</span>
      <span className="word-cell">Song: {word.song}</span>
      <span className="word-cell">{formattedDate}</span>
      <button className="delete-button" onClick={() => onDelete(word.id)}>
        Delete
      </button>
    </div>
  );
}

function WordBank() {
  const [words, setWords] = useState([]);
  const [english, setEnglishWord] = useState("");
  const [korean, setKoreanWord] = useState("");
  const [song, setSong] = useState("");

  useEffect(() => {
    fetchWords();
  }, []);

  const fetchWords = () => {
    api
      .get("/api/wordbank/")
      .then((res) => res.data)
      .then((data) => {
        setWords(data);
        console.log(data);
      })
      .catch((err) => alert(err));
  };

  const deleteWord = (id) => {
    api
      .delete(`/api/wordbank/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("word was deleted");
        else alert("failed to delete word");
        fetchWords();
      })
      .catch((error) => alert(error));
  };

  const createWord = (e) => {
    e.preventDefault();
    api
      .post("/api/wordbank/", { english_word: english, korean_word: korean, song: song })
      .then((res) => {
        if (res.status === 201) alert("word created");
        else alert("failed to make word");
        fetchWords();
      })
      .catch((err) => alert(err));
  };

  return (
    <div className="word-bank-container">
      <div>
        <h2>WordBank</h2>
        <div className="word-table">
          {words.map((word) => (
            <WordRow word={word} onDelete={deleteWord} key={word.id} />
          ))}
        </div>
      </div>
      <h4>New Word</h4>
      <form className="word-form" onSubmit={createWord}>
        <label>English Word</label>
        <input
          type="text"
          id="english"
          name="english"
          onChange={(e) => setEnglishWord(e.target.value)}
          required
          placeholder="Please enter an English word"
        />
        <label>Korean Word</label>
        <input
          type="text"
          id="korean"
          name="korean"
          onChange={(e) => setKoreanWord(e.target.value)}
          required
          placeholder="Please enter the equivalent Korean word"
        />
        <label>Song</label>
        <input
          type="text"
          id="song"
          name="song"
          onChange={(e) => setSong(e.target.value)}
          required
          placeholder="Please enter the song name"
        />
        <button type="submit">Add Word</button>
      </form>
    </div>
  );
}

export default WordBank;
