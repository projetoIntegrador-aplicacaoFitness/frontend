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
import CardExercicio from "./components/exercicio/cardexercicio/CardExercicio";
import FormExercicio from "./components/exercicio/formexercicio/FormExercicio";
import ListaExercicios from "./components/exercicio/listaexercicios/ListaExercicios";
import ListaCategoria from "./components/categoria/listacategoria/ListaCategoria";
import FormCategoria from "./components/categoria/formcategoria/FormCategoria";
import DeletarCategoria from "./components/categoria/deletarcategoria/DeletarCategoria";
import DeletarExercicio from "./components/exercicio/deletarexercicio/DeletarExercicio";

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
              <Route path="/exercicios" element={<ListaExercicios />} />
              <Route path="/cadastrar-exercicio" element={<FormExercicio />} />
              <Route path="/editarexercicio/:id" element={<FormExercicio />} />
              <Route path="/deletarexercicio/:id" element={<DeletarExercicio />} />
              <Route path='/treino' element={<ListaCategoria/>}/>
              <Route path="/treinos/:idCategoria/exercicios" element={<ListaExercicios />} />
              <Route path='/cadastrar-treino' element={<FormCategoria/>}/>
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
