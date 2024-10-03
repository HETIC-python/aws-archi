import { useEffect, useState } from "react";
import Client from "./Client";
import Layout from "./Layout";
export async function fetchUsers() {
  try {
    const res = await fetch("https://ljiegrav3k.execute-api.eu-west-3.amazonaws.com/v1/getAllClients");
    const data = await res.json();
    return JSON.parse(data.body);
  } catch (error) {
    console.log(error);
    return [];
  }
}
export default function Clients() {
  const [clients, _setClients] = useState([]);
  useEffect(() => {
    fetchUsers().then((data) => {
      _setClients(data);
    });
  }, []);

  return (
    <Layout>
      <div className="grid gap-8">
        {clients?.map((client) => (
          <Client key={client.id} client={client} />
        ))}
      </div>
    </Layout>
  );
}
