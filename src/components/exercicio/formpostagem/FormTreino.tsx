import { useState, useContext, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Treino from "../../../models/Exercicio";  
import Tema from "../../../models/Treino";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormTreino() {  

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [temas, setTemas] = useState<Tema[]>([]);

    const [tema, setTema] = useState<Tema>({ id: 0, descricao: '' });
    const [treino, setTreino] = useState<Treino>({} as Treino);  

    const { id } = useParams<{ id: string }>();

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarTreinoPorId(id: string) {  
        try {
            await buscar(`/treinos/${id}`, setTreino, {  
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
            }
        }
    }

    async function buscarTemaPorId(id: string) {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token },
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
            }
        }
    }

    async function buscarTemas() {
        try {
            await buscar('/temas', setTemas, {
                headers: { Authorization: token },
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
        buscarTemas();

        if (id !== undefined) {
            buscarTreinoPorId(id);  
        }
    }, [id]);

    useEffect(() => {
        setTreino({
            ...treino,
            tema: tema,
        });
    }, [tema]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTreino({
            ...treino,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario,
        });
    }

    function retornar() {
        navigate('/treinos');  
    }

    async function gerarNovoTreino(e: ChangeEvent<HTMLFormElement>) {  
        e.preventDefault();
        setIsLoading(true);

        if (id !== undefined) {
            try {
                await atualizar(`/treinos`, treino, setTreino, {  
                    headers: {
                        Authorization: token,
                    },
                });

                ToastAlerta('Treino atualizado com sucesso', "sucesso");
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao atualizar o Treino', "erro");
                }
            }
        } else {
            try {
                await cadastrar(`/treinos`, treino, setTreino, {  
                    headers: {
                        Authorization: token,
                    },
                });

                ToastAlerta('Treino cadastrado com sucesso', "sucesso");
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao cadastrar o Treino', "erro");
                }
            }
        }

        setIsLoading(false);
        retornar();
    }

    const carregandoTema = tema.descricao === '';

    return (
        <div className="container flex flex-col mx-auto items-center">
            <h1 className="text-4xl text-center my-8">
                {id !== undefined ? 'Editar Treino' : 'Cadastrar Treino'}  
            </h1>

            <form className="flex flex-col w-1/2 gap-4" onSubmit={gerarNovoTreino}>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Título do Treino</label>  
                    <input
                        type="text"
                        placeholder="Titulo"
                        name="titulo"
                        required
                        className="border-2 border-blue rounded p-2"
                        value={treino.titulo}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label htmlFor="titulo">Texto do Treino</label> 
                    <input
                        type="text"
                        placeholder="Texto"
                        name="texto"
                        required
                        className="border-2 border-blue rounded p-2"
                        value={treino.texto}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <p>Tema do Treino</p>  
                    <select
                        name="tema"
                        id="tema"
                        className="border p-2 border-blue rounded"
                        onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
                    >
                        <option value="" selected disabled>Selecione um Tema</option>

                        {temas.map((tema) => (
                            <option key={tema.id} value={tema.id}>  
                                {tema.descricao}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="rounded disabled:bg-slate-200 bg-pink-light hover:bg-pink
                               text-white font-bold w-1/2 mx-auto py-2 flex justify-center"
                    disabled={carregandoTema}
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
                        <span>{id !== undefined ? 'Atualizar' : 'Cadastrar'}</span>  
                    )}
                </button>
            </form>
        </div>
    );
}

export default FormTreino;  
