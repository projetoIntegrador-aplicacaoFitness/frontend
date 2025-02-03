import { Link } from 'react-router-dom';
import Treino from '../../../models/Treino';


interface CardTreinosProps {  
    treino: Treino;  
}

function CardTreino({ treino }: CardTreinosProps) {  
    return (
        <div className='border flex flex-col rounded-2xl overflow-hidden justify-between'>
            <header className='py-2 px-6 bg-beige text-black font-bold text-2xl'>Treino</header>  
            <p className='p-8 text-3xl bg-white h-full'>{treino.descricao}</p>  
            
            <div className="flex">
                <Link to={`/editarTreino/${treino.id}`}  
                    className='w-full font-bold text-white bg-blue hover:bg-blue-light 
                        flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>

                <Link to={`/deletarTreino/${treino.id}`}  
                    className='font-bold text-white bg-pink-light hover:bg-red-700 w-full 
                        flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>

        </div>
    );
}

export default CardTreino;  
