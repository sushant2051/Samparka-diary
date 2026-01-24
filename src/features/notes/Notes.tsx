import React, { useState } from "react";
import z from "zod";
import { Button } from "../../components/Button";
import { IoArrowBack } from "react-icons/io5";
import { NoteSchema, type NoteType } from "./validation/notes.validation";
import { InputField } from "../../components/InputFiled";

const mockContacts = [
  { id: 1, name: "Contact 1" },
  { id: 2, name: "Contact 2" },
  { id: 3, name: "Contact 3" },
];

type SavedNote = {
  id: number;
  contactId: number;
  contactName: string;
  description: string;
};

const Notes = () => {
  const [notes, setNotes] = useState<SavedNote[]>([
    {
      id: 1,
      contactId: 1,
      contactName: "Contact 1",
      description: "Follow up call",
    },
    {
      id: 2,
      contactId: 2,
      contactName: "Contact 2",
      description: "Send documents",
    },
  ]);

  const [formData, setFormData] = useState<NoteType>({
    contactId: 0,
    description: "",
  });

  const [editingNote, setEditingNote] = useState<SavedNote | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "contactId" ? Number(value) : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: [] }));
  };

  const handleAddNote = () => {
    setFormData({ contactId: 0, description: "" });
    setEditingNote(null);
    setShowForm(true);
  };

  const handleEdit = (note: SavedNote) => {
    setFormData({
      contactId: note.contactId,
      description: note.description,
    });
    setEditingNote(note);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = NoteSchema.parse(formData);
      setErrors({});

      const contact = mockContacts.find((c) => c.id === data.contactId);

      if (!contact) return;

      if (editingNote) {
        setNotes((prev) =>
          prev.map((n) =>
            n.id === editingNote.id
              ? { ...n, description: data.description }
              : n,
          ),
        );
      } else {
        const newNote: SavedNote = {
          id: notes.length + 1,
          contactId: data.contactId,
          contactName: contact.name,
          description: data.description,
        };
        setNotes((prev) => [...prev, newNote]);
      }

      setShowForm(false);
      setEditingNote(null);
      setFormData({ contactId: 0, description: "" });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string[]> = {};
        err.issues.forEach((issue) => {
          const key = issue.path[0] as string;
          fieldErrors[key] = fieldErrors[key] || [];
          fieldErrors[key].push(issue.message);
        });
        setErrors(fieldErrors);
      }
    }
  };

  const handleResetForm = () => {
    setFormData({
      contactId: 0,
      description: "",
    });
  };

  const filteredNotes = notes.filter((note) =>
    note.contactName.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div className="p-6 w-full flex flex-col gap-4">
      {!showForm ? (
        <>
          <h2 className="text-lg font-bold py-4">Notes</h2>
          <div className="flex justify-between items-center">
            <InputField
              placeholder="Search notes"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button label="Add Note" onClick={handleAddNote} />
          </div>

          <div className="border border-gray-200 rounded-md overflow-hidden">
            <div className="flex px-4 py-2 bg-gray-100 font-bold">
              <span className="w-1/4">Contact</span>
              <span className="w-1/2">Description</span>
              <span className="w-1/4 text-center">Actions</span>
            </div>

            {filteredNotes.map((note) => (
              <div key={note.id}>
                <div className="flex px-4 py-2 items-center">
                  <span className="w-1/4">{note.contactName}</span>
                  <span className="w-1/2">{note.description}</span>
                  <span className="w-1/4 flex justify-center gap-2">
                    <Button label="Edit" onClick={() => handleEdit(note)} />
                    <Button
                      label="Delete"
                      variant="secondary"
                      onClick={() => handleDelete(note.id)}
                    />
                  </span>
                </div>
                <hr className="border-gray-300 mx-4" />
              </div>
            ))}

            {notes.length === 0 && (
              <p className="px-4 py-3 text-gray-500">No notes found</p>
            )}
          </div>
        </>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 border border-gray-200 rounded-md p-4"
        >
          <button
            type="button"
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setShowForm(false)}
          >
            <IoArrowBack /> Go Back
          </button>

          <h2 className="text-lg font-bold">
            {editingNote ? "Edit Note" : "Add Note"}
          </h2>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Select Contact</label>
            <select
              name="contactId"
              value={formData.contactId}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value={0}>Select Contact</option>
              {mockContacts.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            {errors.contactId && (
              <p className="text-red-500 text-sm">{errors.contactId[0]}</p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 rounded h-24 resize-none"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description[0]}</p>
            )}
          </div>

          <Button
            type="submit"
            label={editingNote ? "Update Note" : "Save Note"}
          />
          <Button
            variant="outline"
            onClick={handleResetForm}
            type="reset"
            label="Cancel"
          />
        </form>
      )}
    </div>
  );
};

export default Notes;
