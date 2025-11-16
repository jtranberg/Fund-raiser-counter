import React from "react";
import { Entry } from "./types";


type Props = {
  entries: Entry[];
};

export default function Dashboard({ entries }: Props) {
  const total = entries.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="dashboard">
      <h1>Fundraiser Dashboard</h1>

      <h2>
        Total Raised:{" "}
        <span className="total-amount">${total.toFixed(2)}</span>
      </h2>

      <div className="entry-list">
        {entries.map((e) => (
          <div className="entry-card" key={e.id}>
            <div>
              <strong>{e.name}</strong>
              <p className="date">
                {new Date(e.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="amount">${e.amount.toFixed(2)}</div>
          </div>
        ))}

        {entries.length === 0 && <p>No entries yet.</p>}
      </div>
    </div>
  );
}
