import { useEffect, useState } from "react";
import Client from "./Client";
import Layout from "./Layout";
export async function fetchUsers() {
  try {
    const res = await fetch(
      "https://mlu2cjiiom2byubbw6fepez6yq0zfvqe.lambda-url.eu-west-3.on.aws/"
    );
    return res.json();
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
