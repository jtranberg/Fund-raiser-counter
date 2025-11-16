import { useState } from "react";
import Dashboard from "./Dashboard";
import Admin from "./Admin";
import { loadEntries } from "./storage";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [entries, setEntries] = useState(() => loadEntries());

  return (
    <div className="app">

      {/* 🔵 TOP BANNER */}
      <div className="banner">
        <img src="/banner.jpg" alt="Fundraiser Banner" />
      </div>

      {/* 🔵 NAVIGATION */}
      <nav className="top-nav">
        <button onClick={() => setPage("dashboard")}>Dashboard</button>
        <button onClick={() => setPage("admin")}>Admin</button>
      </nav>

      {/* 🔵 PAGE CONTENT */}
      {page === "dashboard" && <Dashboard entries={entries} />}
      {page === "admin" && (
        <Admin entries={entries} setEntries={setEntries} />
      )}
    </div>
  );
}
