import React from "react";
import { Link } from "react-router-dom";
import "./Home.css"

const NoteCard = ({ note }) => {
  const noteContent =
    note.description.length > 20
      ? note.description.slice(0, 20) + "..."
      : note.description;

  return (
    <Link to={`/${note._id}`} className="note__link">
      <div className="note__box" style={{ backgroundColor: `${note.color}` }}>
        <p className="note__title">{note.title}</p>
        <p className="note__description">{noteContent}</p>
        <div>
          <small>{`Created on ${note.createdAt.substring(0, 10)}`}</small>
          <small>
            {note.modifiedAt
              ? `Modified on ${note.modifiedAt.substring(0, 10)}`
              : ""}
          </small>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
