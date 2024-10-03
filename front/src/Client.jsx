import React from "react";

export default function Client({ client }) {
  return (
    <div key={client.id} className="grid gap-4 border-teal-100 border-[3px] ">
      <div className="grid gap-1">
        <h1>ID:</h1>
        <h1>{client?.id}</h1>
      </div>
      <div className="grid gap-1">
        <h1>Name:</h1>
        <h1>{client?.name}</h1>
      </div>
      <div className="grid gap-1">
        <h1>Project:</h1>
        <h1>{"SOON"}</h1>
      </div>
    </div>
  );
}
