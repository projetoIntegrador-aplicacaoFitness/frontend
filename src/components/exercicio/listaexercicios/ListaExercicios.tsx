import { useNavigate, useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";
import Exercicio from "../../../models/Exercicio";
import CardExercicio from "../cardexercicio/CardExercicio";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import Categoria from "../../../models/Categoria";

function ListaExercicios() {
  const navigate = useNavigate();
  const { idCategoria } = useParams(); // Pegamos o ID da URL, se existir

  const [exercicios, setExercicios] = useState<Exercicio[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  const [categoria, setCategoria] = useState<Categoria>();

  async function buscarCategoria() {
    try {
        await buscar(`categorias/${idCategoria}`, setCategoria, {
            headers: { Authorization: token }
        });
    } catch (error: any) {
        if (error.toString().includes('403')) {
            handleLogout();
        }
    }
}
useEffect(()=>{
  buscarCategoria()
},[idCategoria])

  async function buscarExercicios() {
    try {
      const endpoint = idCategoria
        ? `/categorias/${idCategoria}/exercicios` // Se tiver ID, busca os exercícios filtrados
        : "/exercicios"; // Caso contrário, busca todos os exercícios

      await buscar(endpoint, setExercicios, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarExercicios();
  }, [idCategoria]); // Refaz a busca quando a categoria muda

  return (
    <>
      <div
        className="relative w-full min-h-screen bg-fixed bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/QMvT0m2G/imagemdefundo.jpg')",
        }}
      >
        <div className="py-16">
          <div className="w-full max-w-lg px-4 py-2 rounded-2xl shadow-xl container flex flex-col mx-auto items-center bg-gray-800">
            <h1 className="text-3xl text-center my-4 text-yellow-400 drop-shadow-md transition duration-300 ease-in-out hover:text-orange-500">
              Exercícios
            </h1>
          </div>
        </div>

        {exercicios.length === 0 && (
          <DNA
            visible={true}
            height="200"
            width="200"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper mx-auto"
          />
        )}
        <div className="container mx-auto my-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exercicios.map((exercicio) => (
            <CardExercicio key={exercicio.id} exercicio={exercicio} />
          ))}
        </div>
      </div>
    </>
  );
}

export default ListaExercicios;
