import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Categoria from "../../../models/Categoria";
import Exercicio from "../../../models/Exercicio";
import { AuthContext } from "../../../contexts/AuthContext";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";

function FormExercicio() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  const [categoria, setCategoria] = useState({
    id: 0,
    descricao: "",
    icone: "",
  });
  const [exercicio, setExercicio] = useState<Exercicio>({} as Exercicio);

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

  async function buscarCategoriaPorId(id: string) {
    try {
      await buscar(`/categorias/${id}`, setCategoria, {
        headers: { Authorization: token },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
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
      alert("Você precisa estar logado");
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
    setExercicio({
      ...exercicio,
      [e.target.name]: e.target.value,
      categoria: categoria,
    });
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
        navigate('/exercicios')
        alert("Exercício atualizado com sucesso");
        
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          alert("Erro ao atualizar Exercício");
        }
      }
    } else {
      try {
        await cadastrar(`/exercicios`, exercicio, setExercicio, {
          headers: {
            Authorization: token,
          },
        });
        navigate('/exercicios')
        alert("Exercício cadastrado com sucesso");
        
      } catch (error: any) {
        if (error.toString().includes("403")) {
          handleLogout();
        } else {
          alert("Erro ao cadastrar Exercício");
        }
      }
    }
  }

  const carregandoCategoria = categoria.descricao === "";

  return (

    <div className="w-full max-w-lg  p-6 rounded-2xl shadow-xl container flex flex-col mx-auto items-center bg-black-600 ">
      <h1 className="text-4xl text-center my-8 text-orange-400">
        {id !== undefined ? "Editar Exercício" : "Cadastrar Exercício"}
      </h1>
        
      <form className="flex flex-col w-1/2 gap-4 " onSubmit={gerarNovoExercicio}>
      
        <div className="flex flex-col gap-2 ">
          <label htmlFor="nome">Nome do Exercício</label>
          <input
            type="text"
            placeholder="Insira o nome do Exercício"
            name="nome"
            required
            className="border-2 border-orange-400 rounded p-2 text-black-200"
            value={exercicio.nome}
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
          />
        </div>
        

        <div className="flex flex-col gap-2">
          <p>Categoria do Exercício</p>
          <select
            name="categoria"
            id="categoria"
            className="border p-2 border-orange-400 rounded text-black-200"
            onChange={(e) => buscarCategoriaPorId(e.currentTarget.value)}
          >
            <option value="" selected disabled className="text-gray-400">
              Selecione uma Categoria
            </option>

            {categorias.map((categoria) => (
              <>
                <option className="text-black-200" value={categoria.id}>{categoria.descricao}</option>
              </>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="rounded disabled:bg-slate-200 bg-orange-200 hover:bg-orange-400
                               text-white font-bold w-1/2 mx-auto py-2 flex justify-center"
          disabled={carregandoCategoria}
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
            <span>{id !== undefined ? "Atualizar" : "Cadastrar"}</span>
          )}
        </button>
      </form>
    </div>
  );
}

export default FormExercicio;
