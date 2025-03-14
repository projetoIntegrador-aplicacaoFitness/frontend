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
      ToastAlerta("Você precisa estar logado", "info");
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

      ToastAlerta("Exercício apagado com sucesso", "sucesso");
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      } else {
        ToastAlerta("Erro ao deletar exercício!", "erro");
      }
    }

    setIsLoading(false);
    retornar();
  }

  function retornar() {
    navigate("/exercicios");
  }

  return (
    <>
      <div
        className="relative w-full min-h-screen bg-fixed bg-cover bg-center py-4 flex flex-col gap-8"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/QMvT0m2G/imagemdefundo.jpg')",
        }}
      >
        <div className="w-full max-w-lg px-4 py-2 rounded-2xl shadow-xl container flex flex-col mx-auto items-center bg-gray-800">
          <h1 className="text-3xl text-center my-4 text-yellow-400 drop-shadow-md transition duration-300 ease-in-out hover:text-orange-500">
            Deletar Exercício
          </h1>
          <p className="text-center font-semibold mb-4">
            Você tem certeza de que deseja apagar o exercício a seguir?
          </p>
        </div>

        <div className="container w-auto mx-auto">
          <div className="border flex flex-col rounded-2xl overflow-hidden justify-between">
            <header className="py-2 px-6 bg-gray-800 text-white text-2xl">
              {exercicio.nome}
            </header>

            <div className="p-4 flex flex-col justify-center items-center bg-white">
              <img
                className="w-auto rounded-3xl"
                src={exercicio.foto}
                alt={"Foto: " + exercicio.nome}
              />
              <p className="text-xl h-full">{exercicio.nome}</p>
            </div>
            <div className="flex">
              <button
                className="text-slate-100 bg-red-700 hover:bg-red-600 w-full py-2"
                onClick={retornar}
              >
                Não
              </button>
              <button
                className="w-full text-slate-100 bg-green-700 
                        hover:bg-green-600 flex items-center justify-center"
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
      </div>
    </>
  );
}

export default DeletarExercicio;
