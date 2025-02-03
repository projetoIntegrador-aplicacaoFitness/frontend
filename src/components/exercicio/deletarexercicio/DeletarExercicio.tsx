import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
 
import { buscar, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import Exercicio from "../../../models/Exercicio";

function DeletarExercicio() {  
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [exercicio, setExercicio] = useState<Exercicio>({} as Exercicio);  

  const { id } = useParams<{ id: string }>();
  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

 
  async function buscarPorId(id: string) {
    try {
      await buscar(`/postagens/${id}`, setExercicio, {  
        headers: {
          'Authorization': token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === '') {
      ToastAlerta('Você precisa estar logado', "info");
      navigate('/');
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
      await deletar(`/postagens/${id}`, {
        headers: {
          'Authorization': token,
        },
      });

      ToastAlerta('Exercício apagado com sucesso', "sucesso");  
    } catch (error: any) {
      if (error.toString().includes('403')) {
        handleLogout();
      } else {
        ToastAlerta('Erro ao deletar o exercício.', "erro");  
      }
    }

    setIsLoading(false);
    retornar();
  }

  
  function retornar() {
    navigate(`/postagens/${exercicio.id}`);  
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-lg bg-opacity-90 rounded-4xl shadow-xl">
        <h1 className="text-white text-4xl text-center mb-4">Deletar Exercício</h1>  

        <p className="text-white text-center text-lg font-semibold mb-4">
          Você tem certeza de que deseja apagar o exercício a seguir?  
        </p>

        <div className="bg-opacity-90 border flex flex-col rounded-2xl overflow-hidden ">
          <header className="py-12 text-center bg-black text-white font-bold text-2xl">
            Exercício  
          </header>
          <div className="text-white p-6 py-12 ">
            <p className="text-left text-3xl h-full">{exercicio.titulo}</p>  
            <p className="text-base">{exercicio.texto}</p>  
          </div>
          <div className="flex">
            <button
              className="text-slate-100 bg-red-600 hover:bg-red-800 w-full py-2"
              onClick={retornar}
            >
              Não
            </button>
            <button
              className="w-full text-slate-100 bg-indigo-600 hover:bg-indigo-800 flex items-center justify-center"
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
  );
}

export default DeletarExercicio;  
