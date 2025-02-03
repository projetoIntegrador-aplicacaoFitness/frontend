import { Link } from 'react-router-dom'
import Exercicio from '../../../models/Exercicio'


interface CardExercicioProps {
    exercicio: Exercicio
}

function CardExercicio({ exercicio }: CardExercicioProps) {
    return (
        <>
      <div className="max-w-sm rounded-2xl overflow-hidden shadow-2xl p-4 bg-white     ">
        <img
          className="w-full h-48 object-cover rounded-4xl rounded-2xl"
          src={exercicio.foto}
          alt={'Foto: '+exercicio.nome}
        />
        <div className='flex flex-col items-center justify-center mt-2'>
        <p>{exercicio.nome}</p>
        </div>
        
        <div className="flex">
                <Link to='' 
                    className='w-full text-white bg-indigo-400 
                    hover:bg-indigo-800 flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>
                <Link to='' 
                    className='text-white bg-red-400 
                    hover:bg-red-700 w-full flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>
        
      </div>
    </>
    )
}

export default CardExercicio