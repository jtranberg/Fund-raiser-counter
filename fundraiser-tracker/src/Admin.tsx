import { useState } from "react";
import { Entry } from "./types";
import { saveEntries, saveGoal } from "./storage";

type Props = {
  entries: Entry[];
  setEntries: (e: Entry[]) => void;
  goal: number;
  setGoal: (g: number) => void;
};

const ADMIN_PASSWORD = "letmein"; // change later

export default function Admin({ entries, setEntries, goal, setGoal }: Props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [goalInput, setGoalInput] = useState(goal.toString());

  // 🔵 Edit state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editAmount, setEditAmount] = useState("");

  const tryLogin = () => {
    if (pw === ADMIN_PASSWORD) setLoggedIn(true);
    else alert("Wrong password");
  };

  const addEntry = () => {
    if (!name || !amount) return;

    const newEntry: Entry = {
      id: crypto.randomUUID(),
      name,
      amount: parseFloat(amount),
      createdAt: new Date().toISOString(),
    };

    const updated = [...entries, newEntry];
    setEntries(updated);
    saveEntries(updated);

    setName("");
    setAmount("");
  };

  const updateGoal = () => {
    const parsed = parseFloat(goalInput);
    if (isNaN(parsed) || parsed <= 0) {
      alert("Please enter a valid goal amount greater than 0.");
      return;
    }

    setGoal(parsed);
    saveGoal(parsed);
    alert("Fundraising goal updated.");
  };

  // 🔵 Start editing an entry
  const startEdit = (entry: Entry) => {
    setEditingId(entry.id);
    setEditName(entry.name);
    setEditAmount(entry.amount.toString());
  };

  // 🔵 Save edited entry
  const saveEdit = () => {
    if (!editingId) return;
    if (!editName || !editAmount) {
      alert("Please fill out both name and amount.");
      return;
    }

    const parsed = parseFloat(editAmount);
    if (isNaN(parsed) || parsed < 0) {
      alert("Please enter a valid amount.");
      return;
    }

    const updated = entries.map((e) =>
      e.id === editingId ? { ...e, name: editName, amount: parsed } : e
    );

    setEntries(updated);
    saveEntries(updated);

    setEditingId(null);
    setEditName("");
    setEditAmount("");
  };

  // 🔵 Cancel editing
  const cancelEdit = () => {
    setEditingId(null);
    setEditName("");
    setEditAmount("");
  };

  // 🔵 Delete entry
  const deleteEntry = (entry: Entry) => {
    if (
      !window.confirm(
        `Delete entry for ${entry.name} - $${entry.amount.toFixed(2)}?`
      )
    ) {
      return;
    }

    const updated = entries.filter((x) => x.id !== entry.id);
    setEntries(updated);
    saveEntries(updated);
  };

  if (!loggedIn) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Password"
          value={pw}
          onChange={(e) => setPw(e.target.value)}
        />
        <button onClick={tryLogin}>Login</button>
      </div>
    );
  }

  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

      {/* 🔵 GOAL CONTROL */}
      <div className="goal-panel">
        <h3>Fundraising Goal</h3>
        <p className="goal-current">
          Current goal: <strong>${goal.toLocaleString()}</strong>
        </p>

        <div className="form-row">
          <input
            type="number"
            placeholder="Set new goal"
            value={goalInput}
            onChange={(e) => setGoalInput(e.target.value)}
          />
          <button onClick={updateGoal}>Update Goal</button>
        </div>
      </div>

      {/* 🔵 ADD ENTRY */}
      <div className="form-row">
        <input
          type="text"
          placeholder="Fundraiser Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={addEntry}>Add</button>
      </div>

      <h3>Existing Entries</h3>
      {entries.map((e) => {
        const isEditing = editingId === e.id;

        return (
          <div className="entry-card-admin" key={e.id}>
            {isEditing ? (
              <>
                <div className="edit-fields">
                  <input
                    type="text"
                    value={editName}
                    onChange={(ev) => setEditName(ev.target.value)}
                    placeholder="Fundraiser Name"
                  />
                  <input
                    type="number"
                    value={editAmount}
                    onChange={(ev) => setEditAmount(ev.target.value)}
                    placeholder="Amount"
                  />
                </div>
                <div className="entry-actions">
                  <button className="save-btn" onClick={saveEdit}>
                    Save
                  </button>
                  <button className="cancel-btn" onClick={cancelEdit}>
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <strong>{e.name}</strong> — ${e.amount.toFixed(2)}
                </div>
                <div className="entry-actions">
                  <button
                    className="edit-btn"
                    onClick={() => startEdit(e)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => deleteEntry(e)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}
