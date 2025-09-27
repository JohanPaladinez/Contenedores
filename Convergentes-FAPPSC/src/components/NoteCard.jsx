import { useNotes } from "../context/NotesContext";
import { Link } from "react-router-dom";

function NoteCard({ note }) {
  const { deleteNote } = useNotes();

  return (
    <div className="max-w-md w/full m-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 shadow hover:shadow-md transition">
      <header className="flex items-start justify-between gap-3">
        <h1 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {note.title}
        </h1>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              deleteNote(note._id);
            }}
            className="px-3 py-1.5 rounded-lg bg-white text-gray-800 text-sm font-medium border border-gray-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300/40 transition"
          >
            Delete
          </button>

          <Link
            to={`/notes/${note._id}`}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 transition"
          >
            Edit
          </Link>
        </div>
      </header>

      <p className="mt-2 text-gray-700 whitespace-pre-wrap">
        {note.description}
      </p>

      <span className="mt-4 block text-xs text-gray-500">
        Fecha: {note.date}
      </span>
    </div>
  );
}

export default NoteCard;
