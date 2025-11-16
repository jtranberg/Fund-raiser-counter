import React from "react";
import { Entry } from "./types";


type Props = {
  entries: Entry[];
  goal: number;
};

export default function Dashboard({ entries, goal }: Props) {
  const total = entries.reduce((sum, e) => sum + e.amount, 0);
  const safeGoal = goal > 0 ? goal : 1; // avoid divide-by-zero

  return (
    <div className="dashboard">
      <h1>Fundraiser Dashboard</h1>

      {/* === TOTAL RAISED SECTION === */}
      <h2 className="total-title">Total Raised</h2>

      <div className="total-wrapper">
        <div className="total-number">${total.toFixed(2)}</div>
        <div className="goal-text">of ${safeGoal.toLocaleString()}</div>
      </div>

      {/* PROGRESS BAR */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${Math.min((total / safeGoal) * 100, 100)}%`,
          }}
        ></div>
      </div>

      {/* === BAR CHART === */}
      <h3>Fundraising by Event</h3>
      <div className="chart-container">
        {entries.length === 0 && <p>No data yet.</p>}

        {entries.length > 0 &&
          entries.map((entry) => (
            <div className="chart-row" key={entry.id}>
              <span className="chart-name">{entry.name}</span>
              <div className="chart-bar">
                <div
                  className="chart-fill"
                  style={{
                    width: `${Math.min(
                      (entry.amount / (total || 1)) * 100,
                      100
                    )}%`,
                  }}
                ></div>
              </div>
              <span className="chart-amount">${entry.amount.toFixed(2)}</span>
            </div>
          ))}
      </div>

      {/* === ENTRY LIST === */}
      <h3>All Entries</h3>
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
