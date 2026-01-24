import React, { useState } from "react";
import { Button } from "../../components/Button";
import z from "zod";
import {
  ReminderSchema,
  type ReminderType,
} from "./validation/reminder.validation";
import { InputField } from "../../components/InputFiled";
import { IoArrowBack } from "react-icons/io5";

const mockContacts = [
  { id: 1, name: "Contact 1" },
  { id: 2, name: "Contact 2" },
  { id: 3, name: "Contact 3" },
];

const reminderTypes = ["Birthday", "Meeting", "Anniversary", "Other"];

type ReminderRow = ReminderType & { id: number };

const Reminder = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingReminder, setEditingReminder] = useState<ReminderRow | null>(
    null,
  );
  const [searchValue, setSearchValue] = useState("");

  const [reminders, setReminders] = useState<ReminderRow[]>([
    {
      id: 1,
      contactId: 1,
      title: "Birthday reminder",
      date: "2026-05-10",
      time: "10:00",
      type: "Birthday",
    },
    {
      id: 2,
      contactId: 2,
      title: "Project meeting",
      date: "2026-05-20",
      time: "14:30",
      type: "Meeting",
    },
  ]);

  const [formData, setFormData] = useState<ReminderType>({
    contactId: 0,
    title: "",
    date: "",
    time: "",
    type: "",
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "contactId" ? Number(value) : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: [] }));
  };

  const handleAdd = () => {
    setFormData({ contactId: 0, title: "", date: "", time: "", type: "" });
    setEditingReminder(null);
    setShowForm(true);
  };

  const handleEdit = (reminder: ReminderRow) => {
    const { ...rest } = reminder;
    setFormData(rest);
    setEditingReminder(reminder);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const data = ReminderSchema.parse(formData);
      setErrors({});

      if (editingReminder) {
        setReminders((prev) =>
          prev.map((r) =>
            r.id === editingReminder.id ? { ...r, ...data } : r,
          ),
        );
      } else {
        setReminders((prev) => [...prev, { id: prev.length + 1, ...data }]);
      }

      setShowForm(false);
      setEditingReminder(null);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string[]> = {};
        err.issues.forEach((issue) => {
          const key = issue.path[0] as string;
          if (!fieldErrors[key]) fieldErrors[key] = [];
          fieldErrors[key].push(issue.message);
        });
        setErrors(fieldErrors);
      }
    }
  };

  const handleDelete = (id: number) => {
    setReminders((prev) => prev.filter((r) => r.id !== id));
  };

  const getContactName = (id: number) =>
    mockContacts.find((c) => c.id === id)?.name || "-";

  const filteredData = reminders.filter((reminder) =>
    reminder.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div className="p-6 w-full flex flex-col gap-4">
      {!showForm ? (
        <>
          <p className="text-xl font-bold py-4">Reminders</p>
          <div className="flex justify-between">
            <InputField
              placeholder="Search reminder"
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <Button label="Add Reminder" onClick={handleAdd} />
          </div>

          <div className="border border-gray-200 rounded-md overflow-hidden">
            <div className="flex px-4 py-2 bg-gray-100 font-bold">
              <span className="w-1/5">Contact</span>
              <span className="w-1/5">Reminder</span>
              <span className="w-1/5">Date</span>
              <span className="w-1/5">Time</span>
              <span className="w-1/5 text-center">Actions</span>
            </div>

            {filteredData.map((reminder) => (
              <div key={reminder.id}>
                <div className="flex px-4 py-2">
                  <span className="w-1/5">
                    {getContactName(reminder.contactId)}
                  </span>
                  <span className="w-1/5">{reminder.title}</span>
                  <span className="w-1/5">{reminder.date}</span>
                  <span className="w-1/5">{reminder.time}</span>
                  <span className="w-1/5 text-center flex items-center gap-2 justify-center">
                    <Button label="Edit" onClick={() => handleEdit(reminder)} />
                    <Button
                      variant="secondary"
                      label="Delete"
                      onClick={() => handleDelete(reminder.id)}
                    />
                  </span>
                </div>
                <hr className="mx-4 border-gray-300" />
              </div>
            ))}
          </div>
        </>
      ) : (
        <form
          className="flex flex-col gap-4 border border-gray-200 rounded-md p-4"
          onSubmit={handleSubmit}
        >
          <div>
            <button
              onClick={() => setShowForm(false)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <IoArrowBack /> Go Back
            </button>
          </div>
          <h2 className="font-bold text-lg">
            {editingReminder ? "Edit Reminder" : "Add Reminder"}
          </h2>

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
            <p className="text-red-500">{errors.contactId[0]}</p>
          )}

          <InputField
            label="Reminder Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            errors={errors.title}
          />

          <InputField
            label="Date"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            errors={errors.date}
          />

          <InputField
            label="Time"
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            errors={errors.time}
          />

          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Select type</option>
            {reminderTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.type && <p className="text-red-500">{errors.type[0]}</p>}

          <div className="flex flex-col w-full gap-2">
            <Button type="submit" label="Save" />
            <Button
              type="button"
              label="Cancel"
              variant="outline"
              onClick={() => setShowForm(false)}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default Reminder;
