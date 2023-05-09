import Home from "@/pages";
import Login from "@/pages"
import Catalog from "@/pages";
import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/login" element={<Login />}/>
        <Route path="/catalog" element={<Catalog />}/>
      </Routes>
    </BrowserRouter>
  );
}
