import React from "react";
import { Link } from "react-router-dom";

export default function Layout({ children }) {
  return (
    <div className="grid gap-10">
      <nav>
        <ul className="flex gap-4">
          <li>
            <Link to="/">Clients</Link>
          </li>

          <li>
            <Link to="/create">Create Client</Link>
          </li>
        </ul>
      </nav>
      {children}
    </div>
  );
}
