import { useState } from "react";
import { Entry } from "./types";
import { saveEntries } from "./storage";

type Props = {
  entries: Entry[];
  setEntries: (e: Entry[]) => void;
};

const ADMIN_PASSWORD = "letmein"; // change later

export default function Admin({ entries, setEntries }: Props) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [pw, setPw] = useState("");
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

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
      {entries.map((e) => (
        <div className="entry-card-admin" key={e.id}>
          <strong>{e.name}</strong> — ${e.amount.toFixed(2)}
        </div>
      ))}
    </div>
  );
}
