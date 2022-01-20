import React from 'react';

const NoteCard = ({ note }) => {
    const noteContent = note.description.slice(0, 20) + "..."

    return (
        <div className='note__box' style={{ backgroundColor: `${note.color}` }}>
        <p>{note.title}</p>
        <p>{noteContent}</p>
        <div>
          <small>{note.createdAt.substring(0, 10)}</small>
          <small>
            {note.modifiedAt ? `Modified on ${note.modifiedAt.substring(0, 10)}` : ""}
          </small>
        </div>
      </div>
    );
};

export default NoteCard;
