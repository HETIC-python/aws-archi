import React from "react";
import { Link } from "react-router-dom";
export default function Client({ client }) {
  return (
    <div key={client.id} className="grid p-2 gap-4 border-teal-100 border-[3px] ">
      <div className="grid gap-1">
        <h1>ID: {client?.id}</h1>
      </div>
      <div className="grid gap-1">
        <h1>Name: {client?.name}</h1>
      </div>
      <div className="grid gap-1">
        <h1>Project: {"SOON"}</h1>
      </div>
      <Link to={`/client/${client?.id}`}>Voir</Link>
    </div>
  );
}
