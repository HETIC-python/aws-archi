import React from "react";
import { Link } from "react-router-dom";
export default function Client({ client }) {
  return (
    <div key={client.id} className="grid py-4  px-2 gap-4 border-black  border-[3px] ">
      <div className="grid gap-1">
        <h1>ID: {client?.id}</h1>
      </div>
      <div className="grid gap-1">
        <h1>Name: {client?.name}</h1>
      </div>
      <div className="grid gap-1">
        <h1>Company: {client?.company}</h1>
      </div>
      <Link className="border p-2 px-5 rounded-xl bg-black text-white w-fit" to={`/client/${client?.id}`}>Voir {"->"}</Link>
    </div>
  );
}
