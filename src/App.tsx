import { BrowserRouter, Form, Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import { AuthProvider } from "./contexts/AuthContext";
import "react-toastify/dist/ReactToastify.css";
import Sobre from "./components/sobre/Sobre";
import { ToastContainer } from "react-toastify";
import Perfil from "./pages/perfil/Perfil";
import ListaCategoria from "./components/categoria/ListaCategoria";
import FormCategoria from "./components/categoria/FormCategoria";
import DeletarCategoria from "./components/categoria/DeletarCategoria";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/login" element={<Login />} />
              <Route path="/perfil" element={<Perfil />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path='/categorias' element={<ListaCategoria/>}/>
              <Route path='/cadastrarCategoria' element={<FormCategoria/>}/>
              <Route path="/editarCategoria/:id" element={<FormCategoria/>}/>
              <Route path="/deletarCategoria/:id" element={<DeletarCategoria/>}/>
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
