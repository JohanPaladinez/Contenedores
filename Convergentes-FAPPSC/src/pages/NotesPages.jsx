import { useEffect } from "react";
import { useNotes } from "../context/NotesContext";
import NoteCard from "../components/NoteCard";

export function NotesPage() {
  const { notes, getNotes } = useNotes();

  useEffect(() => {
    getNotes();
  }, []);

  useEffect(() => {
    console.log("Notas actualizadas:", notes);
  }, [notes]);

  if (notes.length === 0)
    return (
      <div className="min-h-[calc(100vh-100px)] bg-gray-50 flex items-center justify-center px-4">
        <h1 className="text-gray-500 text-lg">No hay tareas</h1>
      </div>
    );

  return (
    <div className="min-h-[calc(100vh-100px)] bg-gray-50 px-6 py-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-900 mb-6">Tus notas</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {notes.map((note) => (
            <NoteCard note={note} key={note._id} />
          ))}
        </div>
      </div>
    </div>
  );
}
