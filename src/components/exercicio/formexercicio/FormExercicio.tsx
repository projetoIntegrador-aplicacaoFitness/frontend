import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import Exercicio from "../../../models/Exercicio";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormExercicio() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [categoria, setCategoria] = useState({
    id: undefined,
    descricao: "",
    icone: "",
  });
  const [exercicio, setExercicio] = useState<Exercicio>({
    nome: "",
    serie: undefined,
    repeticao: undefined,
    peso: undefined,
    descanso: undefined,
    foto: "",
    categoria: undefined,
  });

  const { id } = useParams<{ id: string }>();

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarExercicioPorId(id: string) {
    try {
      await buscar(`/exercicios/${id}`, setExercicio, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  const [isCategoriaCarregando, setIsCategoriaCarregando] = useState(false);

  async function buscarCategoriaPorId(id: string) {
    setIsCategoriaCarregando(true); // Ativa o spinner
    try {
      await buscar(`/categorias/${id}`, setCategoria, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
    setTimeout(() => setIsCategoriaCarregando(false), 1500); // Simula um pequeno tempo de carregamento
  }

  async function buscarCategorias() {
    try {
      await buscar("/categorias", setCategorias, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarCategorias();

    if (id !== undefined) {
      buscarExercicioPorId(id);
    }
  }, [id]);

  useEffect(() => {
    setExercicio({
      ...exercicio,
      categoria: categoria,
    });
  }, [categoria]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, type } = e.target;

    setExercicio((prevExercicio) => ({
      ...prevExercicio,
      [name]: type === "number" ? Number(value) : value, // Converte para número se for um input numérico
      categoria: categoria,
    }));
  }

  function retornar() {
    navigate("/exercicios");
  }

  async function gerarNovoExercicio(e: ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    if (id !== undefined) {
      try {
        await atualizar(`/exercicios`, exercicio, setExercicio, {
          headers: {
            Authorization: token,
          },
        });
        navigate("/exercicios");
        ToastAlerta("Exercício atualizado com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao atualizar exercício", "erro");
        }
      }
    } else {
      try {
        console.log("Dados enviados:", JSON.stringify(exercicio, null, 2));
        await cadastrar(`/exercicios`, exercicio, setExercicio, {
          headers: {
            Authorization: token,
          },
        });
        navigate("/exercicios");
        ToastAlerta("Exercício cadastrado com sucesso", "sucesso");
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          ToastAlerta("Erro ao cadastrar exercício", "erro");
        }
      }
    }
  }

  const carregandoCategoria = categoria.descricao === "";

  return (
    <>
      <div
        className="relative w-full min-h-screen bg-fixed bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/QMvT0m2G/imagemdefundo.jpg')",
        }}
      >
        <div className="flex justify-center items-center min-h-screen">
          <div className="w-full max-w-lg p-6 rounded-2xl shadow-xl container flex flex-col mx-auto items-center bg-black-600 bg-opacity-75">
            <h1 className="text-3xl text-center my-4 text-yellow-400 drop-shadow-md transition duration-300 ease-in-out hover:text-orange-500">
              {id !== undefined ? "Editar Exercício" : "Cadastrar Exercício"}
            </h1>

            <form
              className="flex flex-col w-full gap-4"
              onSubmit={gerarNovoExercicio}
            >
              <div className="flex flex-col gap-2">
                <label htmlFor="nome">Nome do Exercício</label>
                <input
                  type="text"
                  placeholder="Insira o nome do Exercício"
                  name="nome"
                  required
                  className="border-2 border-orange-400 rounded p-2 text-black-200"
                  value={exercicio.nome}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    atualizarEstado(e)
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="foto">Imagem do Exercício</label>
                <input
                  type="text"
                  placeholder="Insira um link com uma imagem do Exercício"
                  name="foto"
                  required
                  className="border-2 border-orange-400 rounded p-2 text-black-200"
                  value={exercicio.foto}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    atualizarEstado(e)
                  }
                />
              </div>
              <div className="flex  flex-col md:flex-row gap-2">
                <div className="flex flex-col gap-2 md:w-1/2">
                  <label htmlFor="serie">Nº de Séries Recomendadas</label>
                  <input
                    type="number"
                    placeholder="Insira um valor"
                    name="serie"
                    min="1"
                    required
                    className="border-2 border-orange-400 rounded p-2 text-black-200"
                    value={exercicio.serie}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      atualizarEstado(e)
                    }
                  />
                </div>
                <div className="flex flex-col gap-2 md:w-1/2">
                  <label htmlFor="repeticao">Nº de Repetições</label>
                  <input
                    type="number"
                    placeholder="Insira um valor"
                    name="repeticao"
                    min="1"
                    required
                    className="border-2 border-orange-400 rounded p-2 text-black-200"
                    value={exercicio.repeticao}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      atualizarEstado(e)
                    }
                  />
                </div>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col gap-2 w-1/2">
                  <label htmlFor="peso">Peso Recomendado (Kg)</label>
                  <input
                    type="number"
                    placeholder="Insira um valor"
                    name="peso"
                    min="1"
                    required
                    className="border-2 border-orange-400 rounded p-2 text-black-200"
                    value={exercicio.peso}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      atualizarEstado(e)
                    }
                  />
                </div>
                <div className="flex flex-col gap-2 w-1/2">
                  <label htmlFor="descanso">Tempo de Descanso (minutos)</label>
                  <input
                    type="number"
                    placeholder="Tempo de descanso"
                    name="descanso"
                    min="1"
                    required
                    className="border-2 border-orange-400 rounded p-2 text-black-200"
                    value={exercicio.descanso}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      atualizarEstado(e)
                    }
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <p>Treino para o Exercício</p>
                <select
                  name="categoria"
                  id="categoria"
                  required
                  className="border p-2 border-orange-400 rounded text-black-200"
                  onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
                >
                  <option value="" selected disabled className="text-gray-400">
                    Selecione um Treino
                  </option>
                  {categorias.map((categoria) => (
                    <option
                      key={categoria.id}
                      className="text-black-200"
                      value={categoria.id}
                    >
                      {categoria.descricao}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-center">
                <button
                  type="submit"
                  className="rounded text-white bg-yellow-700 hover:bg-yellow-500 w-1/2 py-2 flex justify-center"
                  disabled={isLoading || categoria.id === undefined} // Bloqueia enquanto carrega
                >
                  {isLoading || isCategoriaCarregando ? (
                    <RotatingLines
                      strokeColor="white"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="24"
                      visible={true}
                    />
                  ) : (
                    <span>
                      {id !== undefined ? "Atualizar" : "Cadastrar Exercício"}
                    </span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default FormExercicio;
