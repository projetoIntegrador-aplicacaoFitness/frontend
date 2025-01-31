import { useState, useContext, useEffect, ChangeEvent } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

import Tema from "../../../models/Treino";
import { buscar, atualizar, cadastrar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import { ToastAlerta } from "../../../utils/ToastAlerta";
import Exercicio from "../../../models/Exercicio";

function FormExercicio() {  // Alterado de FormTreino para FormExercicio

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [temas, setTemas] = useState<Tema[]>([]);

    const [tema, setTema] = useState<Tema>({ id: 0, descricao: '' });
    const [exercicio, setExercicio] = useState<Exercicio>({} as Exercicio);  

    const { id } = useParams<{ id: string }>();

    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarExercicioPorId(id: string) {  
        try {
            await buscar(`/postagens/${id}`, setExercicio, {  
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
            buscarExercicioPorId(id);  
        }
    }, [id]);

    useEffect(() => {
        setExercicio({
            ...exercicio,
            tema: tema,
        });
    }, [tema]);

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setExercicio({  
            ...exercicio,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario,
        });
    }

    function retornar() {
        navigate('/postagens');  
    }

    async function gerarNovoExercicio(e: ChangeEvent<HTMLFormElement>) {  
        e.preventDefault();
        setIsLoading(true);

        if (id !== undefined) {
            try {
                await atualizar(`/postagens`, exercicio, setExercicio, {  
                    headers: {
                        Authorization: token,
                    },
                });

                ToastAlerta('Exercício atualizado com sucesso', "sucesso");  
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao atualizar o Exercício', "erro");  
                }
            }
        } else {
            try {
                await cadastrar(`/postagens`, exercicio, setExercicio, {  
                    headers: {
                        Authorization: token,
                    },
                });

                ToastAlerta('Exercício cadastrado com sucesso', "sucesso");  
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao cadastrar o Exercício', "erro");  
                }
            }
        }

        setIsLoading(false);
        retornar();
    }

    const carregandoTema = tema.descricao === '';

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-800">
            <div className="w-full max-w-lg bg-white p-6 rounded-2xl shadow-xl">
                <h1 className="text-3xl text-center mb-6 text-gray-800">
                    {id !== undefined ? 'Editar Exercício' : 'Cadastrar Exercício'}  
                </h1>

                <form className="flex flex-col gap-4" onSubmit={gerarNovoExercicio}>  
                    <div className="flex flex-col gap-2">
                        <label htmlFor="titulo" className="text-gray-800">Título do Exercício</label>  
                        <input
                            type="text"
                            placeholder="Título"
                            name="titulo"
                            required
                            className="border-2 border-gray-300 rounded-lg p-3 text-gray-800"
                            value={exercicio.titulo}  
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="texto" className="text-gray-800">Texto do Exercício</label>  
                        <input
                            type="text"
                            placeholder="Texto"
                            name="texto"
                            required
                            className="border-2 border-gray-300 rounded-lg p-3 text-gray-800"
                            value={exercicio.texto}  
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <p className="text-gray-800">Tema do Exercício</p>  
                        <select
                            name="tema"
                            id="tema"
                            className="border-2 border-gray-300 p-3 rounded-lg text-gray-800"
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
                        className="rounded-lg bg-blue-400 text-white font-bold w-full py-3 mt-4 hover:bg-blue-600 disabled:bg-gray-300"
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
        </div>
    );
}

export default FormExercicio;  
