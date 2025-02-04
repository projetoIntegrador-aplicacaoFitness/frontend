import { Link } from 'react-router-dom'
import Categoria from '../../../models/Categoria'
import { GiStrongMan } from 'react-icons/gi';

interface CardCategoriaProps {
    categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriaProps) {
    return (
        <div className='border flex flex-col border-gray rounded-lg justify-between overflow-hidden 
            transition duration-300 hover:scale-105 my-10 bg-white shadow-sm grid-cols-1 divide-y divide-gray h-96 w-72'> 
            
            <span className='relative z-10 text-black-200 font-semibold text-lg bg-black/50 px-4 py-2'>
                {categoria.descricao}
            </span>
            
            <div className="flex flex-col items-center flex-grow">
                <div className=" w-full flex items-center justify-center relative">
                    <div className="absolute inset-0 bg-black/20"></div>
                    <img 
                        src={categoria.icone} 
                        alt="imagem do exercício" 
                        className='object-cover w-full h-full' 
                    />
                </div>
            </div>

            <div className="flex">
                <Link 
                    to={`/editarCategoria/${categoria.id}`}
                    className="w-full text-slate-100 bg-green-700 
                        hover:bg-green-600 flex items-center justify-center py-2">
                    <button>Editar</button>
                </Link>

                <Link 
                    to={`/deletarCategoria/${categoria.id}`} 
                    className="text-slate-100 bg-red-700 hover:bg-red-600 w-full py-2 
            flex items-center justify-center">
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    );
}

export default CardCategoria;
