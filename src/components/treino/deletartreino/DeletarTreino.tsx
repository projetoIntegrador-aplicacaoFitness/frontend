import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthContext";

import { buscar, deletar } from "../../../services/Service";
import { RotatingLines } from "react-loader-spinner";
import Treino from "../../../models/Treino";

function DeletarTreino() {  

    const navigate = useNavigate();

    const [treino, setTreino] = useState<Treino>({} as Treino);  
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const { id } = useParams<{ id: string }>();

    async function buscarPorId(id: string) {  
        try {
            await buscar(`/postagens/${id}`, setTreino, {  
                headers: {
                    'Authorization': token
                }
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado');
            navigate('/');
        }
    }, [token]);

    useEffect(() => {
        if (id !== undefined) {
            buscarPorId(id);  
        }
    }, [id]);

    async function deletarTreino() {  
        setIsLoading(true);

        try {
            await deletar(`/postagens/${id}`, {  
                headers: {
                    'Authorization': token
                }
            });

            alert('Treino apagado com sucesso');

        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
            } else {
                alert('Erro ao deletar o treino.');
            }
        }

        setIsLoading(false);
        retornar();
    }

    function retornar() {
        navigate("/postagens");  
    }
    
    return (
        <div className='container w-1/3 mx-auto'>
            <h1 className='text-4xl text-center my-4'>Deletar treino</h1>  
            <p className='text-center font-semibold mb-4'>
                Você tem certeza de que deseja apagar o treino a seguir?</p>  
            <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
                <header 
                    className='py-2 px-6 bg-blue text-white font-bold text-2xl'>
                    Treino  
                </header>
                <p className='p-8 text-3xl bg-slate-200 h-full'>{treino.descricao}</p>  
                <div className="flex">
                    <button 
                        className='text-slate-100 bg-pink-light hover:bg-red-600 w-full py-2'
                        onClick={retornar}>
                        Não
                    </button>
                    <button 
                        className='w-full font-bold text-slate-100 bg-blue 
                                   hover:bg-blue-light flex items-center justify-center'
                                   onClick={deletarTreino}>
                        {isLoading ? 
                            <RotatingLines
                                strokeColor="white"
                                strokeWidth="5"
                                animationDuration="0.75"
                                width="24"
                                visible={true}
                            /> :
                            <span>Sim</span>
                        }
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DeletarTreino;  
