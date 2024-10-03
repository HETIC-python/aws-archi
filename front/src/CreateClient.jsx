import { useState } from "react";
import Layout from "./Layout";
import { useNavigate } from "react-router-dom";

export async function createClient(name, company) {
  const res = await fetch(
    "https://mlu2cjiiom2byubbw6fepez6yq0zfvqe.lambda-url.eu-west-3.on.aws/post",
    {
      method: "POST",
      body: JSON.stringify({ name, company }),
    }
  );
  if (!res.ok) {
    throw new Error("Server error");
  }
  return res.json();
}

export default function CreateClient() {
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [error, setError] = useState("");
    const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createClient(name, company);
      if (res) {
        setName("");
        setCompany("");
        
          navigate('/')
      }
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <Layout>
      <div className="border p-2 rounded">
      {error && <div className="bg-red-100 text-red-500 p-2">{error}</div>}
        <form onSubmit={onSubmit}>
          <div className="grid gap-2 p-2">
            <label htmlFor="name">Name</label>
            <input
              className="border"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e?.target?.value)}
              id="name"
            />
          </div>
          <div className="grid gap-2 p-2">
            <label htmlFor="company">Entreprise</label>
            <input
              className="border"
              type="text"
              name="company"
              value={company}
              id="company"
              onChange={(e) => setCompany(e?.target?.value)}
            />
          </div>
          <div>
            <button type="submit" className="bg-black text-white p-2 rounded">
              Submit
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
}
