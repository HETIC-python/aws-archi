import { Route, Routes } from "react-router-dom";
import "./App.css";
import Clients from "./Clients";
import CreateClient from "./CreateClient";

function App() {
  return (
    <>
    <Routes path="/">
      <Route index element={<Clients />} />
      <Route path="create" element={<CreateClient/>} />
    </Routes>
    </>
  );
}

export default App;
