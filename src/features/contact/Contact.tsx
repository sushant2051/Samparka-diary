import React, { useState } from "react";
import { Button } from "../../components/Button";
import z from "zod";
import { InputField } from "../../components/InputFiled";
import { IoArrowBack } from "react-icons/io5";
import {
  ContactSchema,
  type ContactType,
} from "./validation/contact.validation";

type GroupType = {
  id: number;
  name: string;
  members: ContactType[];
};

const relationshipOptions = ["Father", "Mother", "Brother", "Sister", "Friend"];

const Contact = () => {
  const [activeTab, setActiveTab] = useState<"INDIVIDUAL" | "GROUP">(
    "INDIVIDUAL",
  );

  const [contacts, setContacts] = useState<ContactType[]>([
    {
      id: 1,
      name: "John Doe",
      phone: "9806053511",
      email: "john@example.com",
      relationship: "Brother",
      note: "Sample note",
    },
    {
      id: 2,
      name: "Jane Doe",
      phone: "9806053522",
      email: "",
      relationship: "Sister",
      note: "Another note",
    },
    {
      id: 3,
      name: "Bob Smith",
      phone: "9806053533",
      email: "",
      relationship: "Friend",
      note: "Friend note",
    },
  ]);

  const [groups, setGroups] = useState<GroupType[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [editingContact, setEditingContact] = useState<ContactType | null>(
    null,
  );

  const [formData, setFormData] = useState<Omit<ContactType, "id">>({
    name: "",
    phone: "",
    email: "",
    relationship: "",
    note: "",
  });

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [searchQuery, setSearchQuery] = useState("");

  const [groupName, setGroupName] = useState("");
  const [selectedContacts, setSelectedContacts] = useState<number[]>([]);

  const [selectedGroup, setSelectedGroup] = useState<GroupType | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: [] }));
  };

  const handleAddContact = () => {
    setFormData({
      name: "",
      phone: "",
      email: "",
      relationship: "",
      note: "",
    });
    setEditingContact(null);
    setShowForm(true);
  };

  const handleEdit = (contact: ContactType) => {
    const { ...rest } = contact;
    setFormData(rest);
    setEditingContact(contact);
    setShowForm(true);
  };

  const handleDelete = (id: number) => {
    setContacts((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = ContactSchema.parse(formData);

      if (editingContact) {
        setContacts((prev) =>
          prev.map((c) => (c.id === editingContact.id ? { ...c, ...data } : c)),
        );
      } else {
        setContacts((prev) => [...prev, { id: prev.length + 1, ...data }]);
      }

      setShowForm(false);
      setEditingContact(null);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Record<string, string[]> = {};
        err.issues.forEach((issue) => {
          fieldErrors[issue.path[0] as string] = [issue.message];
        });
        setErrors(fieldErrors);
      }
    }
  };

  const toggleContactSelection = (id: number) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id],
    );
  };

  const handleCreateGroup = () => {
    const newGroup: GroupType = {
      id: groups.length + 1,
      name: groupName,
      members: contacts.filter((c) => selectedContacts.includes(c.id)),
    };

    setGroups((prev) => [...prev, newGroup]);
    setGroupName("");
    setSelectedContacts([]);
    setShowGroupForm(false);
  };

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.phone.includes(searchQuery),
  );

  return (
    <div className="p-6 w-full flex flex-col gap-4">
      <div className="flex gap-2">
        <Button
          label="Individual"
          variant={activeTab === "INDIVIDUAL" ? "primary" : "outline"}
          onClick={() => setActiveTab("INDIVIDUAL")}
        />
        <Button
          label="Group"
          variant={activeTab === "GROUP" ? "primary" : "outline"}
          onClick={() => setActiveTab("GROUP")}
        />
      </div>
      {activeTab === "INDIVIDUAL" && !showForm && (
        <>
          <div className="flex justify-between">
            <InputField
              placeholder="Search contacts"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button label="Add Contact" onClick={handleAddContact} />
          </div>

          <div className="border rounded-md">
            {filteredContacts.map((c) => (
              <div key={c.id} className="flex px-4 py-2 justify-between">
                <span>{c.name}</span>
                <span className="flex gap-2">
                  <Button label="Edit" onClick={() => handleEdit(c)} />
                  <Button
                    label="Delete"
                    variant="secondary"
                    onClick={() => handleDelete(c.id)}
                  />
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      {activeTab === "INDIVIDUAL" && showForm && (
        <form
          className="border p-4 flex flex-col gap-2"
          onSubmit={handleSubmit}
        >
          <button
            type="button"
            onClick={() => setShowForm(false)}
            className="flex items-center gap-2"
          >
            <IoArrowBack /> Go Back
          </button>

          <InputField
            name="name"
            label="Name"
            value={formData.name}
            onChange={handleChange}
            errors={errors.name}
          />
          <InputField
            name="phone"
            label="Phone"
            value={formData.phone}
            onChange={handleChange}
            errors={errors.phone}
          />
          <InputField
            name="email"
            label="Email"
            value={formData.email}
            onChange={handleChange}
            errors={errors.email}
          />

          <select
            name="relationship"
            value={formData.relationship}
            onChange={handleChange}
            className="border p-2 rounded"
          >
            <option value="">Relationship</option>
            {relationshipOptions.map((r) => (
              <option key={r}>{r}</option>
            ))}
          </select>

          <textarea
            name="note"
            value={formData.note}
            onChange={handleChange}
            className="border p-2 rounded"
          />

          <Button type="submit" label="Save Contact" />
        </form>
      )}

      {activeTab === "GROUP" && !showGroupForm && (
        <>
          <Button label="Create Group" onClick={() => setShowGroupForm(true)} />

          <div className="border rounded-md">
            {groups.map((group) => (
              <div
                key={group.id}
                onClick={() => setSelectedGroup(group)}
                className="p-4 cursor-pointer border-b"
              >
                <p className="font-bold">{group.name}</p>
                <p className="text-sm text-gray-500">
                  {group.members.map((m) => m.name).join(", ")}
                </p>
              </div>
            ))}

            {groups.length === 0 && (
              <p className="p-4 text-gray-500">No groups created</p>
            )}
          </div>
        </>
      )}

      {activeTab === "GROUP" && showGroupForm && (
        <div className="border p-4 flex flex-col gap-4">
          <button
            type="button"
            onClick={() => setShowGroupForm(false)}
            className="flex items-center gap-2"
          >
            <IoArrowBack /> Go Back
          </button>

          <InputField
            label="Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            errors={errors.groupName}
          />

          {contacts.map((c) => (
            <label key={c.id} className="flex gap-2">
              <input
                type="checkbox"
                checked={selectedContacts.includes(c.id)}
                onChange={() => toggleContactSelection(c.id)}
              />
              {c.name}
            </label>
          ))}

          <Button label="Save Group" onClick={handleCreateGroup} />
        </div>
      )}
      {selectedGroup && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-md p-4">
            <div className="flex justify-between items-center mb-3">
              <h2 className="font-bold text-lg">{selectedGroup.name}</h2>
              <button
                className="cursor-pointer"
                onClick={() => setSelectedGroup(null)}
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {selectedGroup.members.map((m) => (
                <div key={m.id} className="flex justify-between border-b pb-1">
                  <span>{m.name}</span>
                  <span>{m.phone}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
