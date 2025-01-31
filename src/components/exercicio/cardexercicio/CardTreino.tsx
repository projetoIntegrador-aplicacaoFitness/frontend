import { Link } from 'react-router-dom'
import Exercicio from '../../../models/Exercicio';
 

interface CardExerciciosProps {  
    exercicio: Exercicio  
}

function CardExercicio({ exercicio }: CardExerciciosProps) {  
    return (
        <div className='border border-transparent shadow-2xl 
            flex flex-col rounded-xl overflow-hidden justify-between 
            bg-white/20 hover:bg-white/30 transition-all duration-300 transform hover:scale-105'>
                
            <div className="flex flex-col flex-grow">
                <div className="flex w-full bg-beige py-2 px-4 items-center gap-4">
                    <img
                        src={exercicio.usuario?.foto}  
                        className='h-12 rounded-full'
                        alt={exercicio.usuario?.nome} />  
                    <h3 className='text-lg font-bold text-center uppercase'>
                        {exercicio.usuario?.nome}  
                    </h3>
                </div>
                <div className='p-4 bg-white/60 backdrop-blur flex-grow'>
                    <h4 className='text-lg font-semibold uppercase'>{exercicio.titulo}</h4>  
                    <p>{exercicio.texto}</p>  
                    <p>Tema: {exercicio.tema?.descricao}</p>  
                    <p>Data: {new Intl.DateTimeFormat(undefined, {
                        dateStyle: 'full',
                        timeStyle: 'medium',
                    }).format(new Date(exercicio.data))}</p>  
                </div>
            </div>

            <div className="flex">
                <Link to={`/editarExercicio/${exercicio.id}`}  
                    className='w-full text-white font-bold bg-blue-600 
                    hover:bg-blue-500 flex items-center justify-center py-3 rounded-bl-xl transition-all duration-200'>
                    <button>Editar</button>
                </Link>
                <Link to={`/deletarExercicio/${exercicio.id}`}  
                    className='text-white font-bold bg-red-600 
                    hover:bg-red-500 w-full flex items-center justify-center py-3 rounded-br-xl transition-all duration-200'>
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardExercicio;  
