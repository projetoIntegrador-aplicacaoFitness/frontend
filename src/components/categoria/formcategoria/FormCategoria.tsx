import { ChangeEvent, useContext, useEffect, useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";
import Categoria from "../../../models/Categoria";
import { atualizar, buscar, cadastrar } from "../../../services/Service";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function FormCategoria() {

    const navigate = useNavigate();

    const [categoria, setCategoria] = useState<Categoria>({} as Categoria)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`, setCategoria, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'info')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setCategoria({
            ...categoria,
            [e.target.name]: e.target.value
        })
    }

    function retornar() {
        navigate("/treino")
    }

    async function gerarNovaCategoria(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar(`/categorias`, categoria, setCategoria, {
                    headers: { 'Authorization': token }
                })
                ToastAlerta('O Treino foi atualizada com sucesso!', 'sucesso')
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao atualizar o Treino.', 'erro')
                }

            }
        } else {
            try {
                await cadastrar(`/categorias`, categoria, setCategoria, {
                    headers: { 'Authorization': token }
                })
                ToastAlerta('O treino foi cadastrado com sucesso!', 'sucesso')
            } catch (error: any) {
                if (error.toString().includes('403')) {
                    handleLogout();
                } else {
                    ToastAlerta('Erro ao cadastrar o treino.', 'erro')
                }

            }
        }

        setIsLoading(false)
        retornar()
    }

    return (
    <>
        <div
            className="relative w-full min-h-screen bg-fixed bg-cover bg-center "
            style={{
                backgroundImage:
                    "url('https://i.postimg.cc/QMvT0m2G/imagemdefundo.jpg')",
            }}
        >

            <div className="w-full max-w-lg  p-6 rounded-2xl shadow-xl container flex flex-col mx-auto items-center bg-gray-800">
                <h1 className="text-3xl text-center my-4 text-yellow-400 drop-shadow-md transition duration-300 ease-in-out hover:text-orange-500">
                    {id === undefined ? 'Cadastrar Treino' : 'Editar Treino'}
                </h1>

                <form className="w-1/2 flex flex-col gap-4 font-sans text-white  text-lg my-4" onSubmit={gerarNovaCategoria}>
                    <div className="flex flex-col gap-2 ">
                        <label htmlFor="descricao">Descrição do Treino</label>
                        <input
                            type="text"
                            placeholder="Exemplo Superiores, Inferiores, Costa, Perna..."
                            name='descricao'
                            className="border-2 border-slate-700 rounded p-2  text-slate-700"
                            value={categoria.descricao}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}

                        />
                    </div>
                    <div className="flex flex-col gap-2 my-4">
                        <label htmlFor="icone">Ícone do Treino</label>
                        <input
                            type="text"
                            placeholder="Insira o Link com o Ícone do Treino"
                            name='icone'
                            className="border-2 border-slate-700 rounded p-2 text-slate-700 "
                            value={categoria.icone}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}

                        />
                    </div>
                    <button
                        className="rounded text-white bg-yellow-700
                           hover:bg-yellow-500 w-1/2 py-2
                           flex justify-center"
                        type="submit">
                        {isLoading ?
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                            <span>{id === undefined ? 'Cadastrar' : 'Atualizar'}</span>

                        }
                    </button>
                </form>
            </div>
        </div>
    </>
    );
}

export default FormCategoria;