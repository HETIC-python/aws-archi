import { Route, Routes } from "react-router-dom";
import "./App.css";
import Clients from "./Clients";
import CreateClient from "./CreateClient";
import Client from "./pages/Client";
function App() {
  return (
    <>
    <Routes path="/">
      <Route index element={<Clients />} />
      <Route path="create" element={<CreateClient/>} />
      <Route path="client/:id" element={<Client/>} />
    </Routes>
    </>
  );
}

export default App;
