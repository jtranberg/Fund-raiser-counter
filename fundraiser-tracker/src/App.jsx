import { useState } from "react";
import Dashboard from "./Dashboard";
import Admin from "./Admin";
import { loadEntries, loadGoal } from "./storage";
import "./App.css";

export default function App() {
  const [page, setPage] = useState("dashboard");
  const [entries, setEntries] = useState(() => loadEntries());
  const [goal, setGoal] = useState(() => loadGoal(5000));
  const [menuOpen, setMenuOpen] = useState(false);

  const goTo = (targetPage) => {
    setPage(targetPage);
    setMenuOpen(false); // close menu on navigation (mobile)
  };

  return (
    <div className="app">
      {/* 🔵 TOP NAVBAR */}
      <header className="top-nav">
        <div className="nav-left">
          <span className="nav-title">Capitals Fundraiser Tracker</span>
        </div>

        {/* Hamburger for mobile */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
        >
          ☰
        </button>

        {/* Links (show inline on desktop, toggle on mobile) */}
        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          <button
            className={page === "dashboard" ? "nav-btn active" : "nav-btn"}
            onClick={() => goTo("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={page === "admin" ? "nav-btn active" : "nav-btn"}
            onClick={() => goTo("admin")}
          >
            Admin
          </button>
        </div>
      </header>

      {/* 🔵 BANNER BELOW NAV */}
      <div className="banner">
        <img src="/banner.jpg" alt="Fundraiser Banner" />
      </div>

      {/* 🔵 PAGE CONTENT */}
      {page === "dashboard" && <Dashboard entries={entries} goal={goal} />}
      {page === "admin" && (
        <Admin
          entries={entries}
          setEntries={setEntries}
          goal={goal}
          setGoal={setGoal}
        />
      )}
    </div>
  );
}
