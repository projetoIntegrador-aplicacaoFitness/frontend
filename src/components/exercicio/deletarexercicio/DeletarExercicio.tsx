import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

import { buscar, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import Exercicio from "../../../models/Exercicio";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function DeletarExercicio() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [exercicio, setExercicio] = useState<Exercicio>({} as Exercicio);

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarPorId(id: string) {
    try {
      await buscar(`/exercicios/${id}`, setExercicio, {
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
    ToastAlerta("Você precisa estar logado",'info');
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    if (id !== undefined) {
      buscarPorId(id);
    }
  }, [id]);

  async function deletarExercicio() {
    setIsLoading(true);

    try {
      await deletar(`/exercicios/${id}`, {
        headers: {
          Authorization: token,
        },
      });

    ToastAlerta("Exercício apagado com sucesso",'sucesso');
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      } else {
      ToastAlerta("Erro ao deletar Exercício.",'erro');
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/postagens");
  }

  return (
    <div className="container w-1/3 mx-auto">
      <h1 className="text-4xl text-center my-4">Deletar Exercício</h1>

      <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja apagar o Exercício a seguir?
      </p>

      <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
        <header className="py-2 px-6 bg-indigo-600 text-white font-bold text-2xl">
          Exercício
        </header>
        <div className="p-4 flex flex-col justify-center items-center bg-white">
          <img
            className="w-auto"
            src={exercicio.foto}
            alt={"Foto: " + exercicio.nome}
          />
          <p className="text-xl h-full">{exercicio.nome}</p>
        </div>
        <div className="flex">
          <button
            className="text-slate-100 bg-red-400 hover:bg-red-600 w-full py-2"
            onClick={retornar}
          >
            Não
          </button>
          <button
            className="w-full text-slate-100 bg-indigo-400 
                        hover:bg-indigo-600 flex items-center justify-center"
            onClick={deletarExercicio}
          >
            {isLoading ? (
              <RotatingLines
                strokeColor="white"
                strokeWidth="5"
                animationDuration="0.75"
                width="24"
                visible={true}
              />
            ) : (
              <span>Sim</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletarExercicio;
