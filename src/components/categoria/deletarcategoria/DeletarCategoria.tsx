import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../../contexts/AuthContext"
import Categoria from "../../../models/Categoria"
import { buscar, deletar } from "../../../services/Service"
import { RotatingLines } from "react-loader-spinner"
import { ToastAlerta } from "../../../utils/ToastAlerta"

function DeletarCategoria() {

    const navigate = useNavigate()

    const [categoria, setCategoria] = useState<Categoria>({} as Categoria)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    const { id } = useParams<{ id: string }>()

    async function buscarPorId(id: string) {
        try {
            await buscar(`/categorias/${id}`, setCategoria, {
                headers: {
                    'Authorization': token
                }
            })
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado','info')
            navigate('/')
        }
    }, [token])

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id)
        }
    }, [id])

    async function deletarCategoria() {
        setIsLoading(true)

        try {
            await deletar(`/categorias/${id}`, {
                headers: {
                    'Authorization': token
                }
            })

            ToastAlerta('Treino apagado com sucesso','sucesso')

        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout()
            }else {
                ToastAlerta('Erro ao deletar Treino.','erro')
            }
        }

        setIsLoading(false)
        retornar()
    }

    function retornar() {
        navigate("/treino")
    }
    
    return (
    <>
    <div
                className="relative w-full min-h-screen bg-fixed bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://i.postimg.cc/QMvT0m2G/imagemdefundo.jpg')",
                }}
    >
    
    <div className="w-full max-w-lg px-4 py-2 rounded-2xl shadow-xl container flex flex-col mx-auto items-center bg-gray-800">
        <h1 className="text-3xl text-center my-4 text-yellow-400 drop-shadow-md transition duration-300 ease-in-out hover:text-orange-500">
          Deletar Treino
          </h1>
        <p className="text-center font-semibold mb-4">
        Você tem certeza de que deseja apagar o treino a seguir?
      </p>
    </div>
    
    <br/>
    
        <div className='container w-1/3 mx-auto'>

            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header 
                    className="py-2 px-6 bg-orange-400 text-white text-2xl">
                    {categoria.descricao}
                </header>

                <div className="p-4 flex flex-col justify-center items-center bg-white">
                    <img
                    className="w-auto"
                    src={categoria.icone}
                    alt={"Foto: " + categoria.descricao}
                />
                    <p className="text-xl h-full">{categoria.icone}</p>
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
                        onClick={deletarCategoria}
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
    )
}
export default DeletarCategoria