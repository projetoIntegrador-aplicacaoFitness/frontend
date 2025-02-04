import { Link } from 'react-router-dom';
import Categoria from '../../models/Categoria';
import { GiStrongMan } from 'react-icons/gi';

interface CardCategoriaProps {
    categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriaProps) {
    return (
        <div className='border flex flex-col border-gray rounded-lg justify-between overflow-hidden 
         transition duration-300 hover:scale-105 my-10 shadow-white shadow-sm
          grid-cols-1 divide-y divide-gray h-96 w-72 relative'> 

            <div className='p-4 text-2xl text-center relative w-full'>
                <div className="absolute inset-0 bg-black/30"></div>
                <span className='relative z-10 text-white font-bold'>
                    {categoria.descricao}
                </span>
            </div>

            <div className="flex justify-center items-center h-full"> 
                <img 
                    src={categoria.icone} 
                    alt="imagem do exercício" 
                    className="max-w-full max-h-full object-contain"  
                />
            </div>

            <div className="flex">
                <Link
                    to={`/editarCategoria/${categoria.id}`}
                    className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 
                        flex items-center justify-center py-2'>
                    <button>Editar</button>
                </Link>

                <Link
                    to={`/deletarCategoria/${categoria.id}`}
                    className='text-slate-100 bg-red-400 hover:bg-red-700 w-full 
                    flex items-center justify-center py-2'> 
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    );
}

export default CardCategoria;