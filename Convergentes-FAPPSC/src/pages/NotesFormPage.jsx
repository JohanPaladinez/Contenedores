import { useForm } from "react-hook-form";
import { useNotes } from "../context/NotesContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

function NotesFormPage() {
  const { register, handleSubmit, setValue } = useForm();
  const { createNotes, getNote, updateNote } = useNotes();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadNote() {
      if (params.id) {
        const note = await getNote(params.id);
        setValue("title", note.title);
        setValue("description", note.description);
      }
    }
    loadNote();
  }, []); // no toco tu lógica

  const onSubmit = handleSubmit((data) => {
    if (params.id) {
      updateNote(params.id, data);
    } else {
      createNotes(data);
    }
    navigate("/notes");
  });

  return (
    <div className="w-full max-w-2xl mx-auto bg-white border border-gray-200 shadow-lg rounded-2xl p-8 mt-10">
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          {...register("title")}
          autoFocus
          className="w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition"
        />

        <textarea
          rows="3"
          placeholder="Description"
          {...register("description")}
          className="w-full min-h-[140px] rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition"
        ></textarea>

        <button
          type="submit"
          className="w-full justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition"
        >
          Save
        </button>
      </form>
    </div>
  );
}

export default NotesFormPage;
