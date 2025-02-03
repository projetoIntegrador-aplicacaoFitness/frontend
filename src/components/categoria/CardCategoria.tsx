import { Link } from 'react-router-dom'
import Categoria from '../../models/Categoria'
import { GiStrongMan } from 'react-icons/gi';

interface CardCategoriaProps {
    categoria: Categoria;
}

function CardCategoria({ categoria }: CardCategoriaProps) {
    return (
        <div className='border flex flex-col border-gray rounded-lg justify-between overflow-hidden 
         transition duration-300 hover:scale-105 my-10 shadow-white shadow-sm
          grid-cols-1 divide-y divide-gray h-96 w-72'> {/* Ajustei a altura e largura do card */}
            
            {/* Cabeçalho */}
            <header className='py-4 px-6 bg-white text-peach font-bold text-lg h-14 
            flex items-center space-x-2'>
                <GiStrongMan className="mr-2 text-2xl" />
                <span>Categoria</span>
            </header>

            {/* Contêiner da imagem e descrição */}
            <div className="flex flex-col items-center flex-grow">
                {/* Contêiner da imagem */}
                <div className="h-48 w-full flex items-center justify-center relative">
                    {/* Overlay escuro sobre a imagem (opcional) */}
                    <div className="absolute inset-0 bg-black/20"></div>
                    <img 
                        src={categoria.icone} 
                        alt="imagem do exercício" 
                        className='max-w-full max-h-full object-cover' // Garante que a imagem cubra o espaço
                    />
                </div>

                {/* Descrição com faixa discreta */}
                <div className='p-4 text-2xl text-center relative w-full'>
                    {/* Faixa discreta atrás do texto */}
                    <div className="absolute inset-0 bg-black/30"></div>
                    
                    {/* Texto com destaque */}
                    <span className='relative z-10 text-white font-bold'>
                        {categoria.descricao}
                    </span>
                </div>
            </div>

            {/* Botões de editar e deletar */}
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
                    flex items-center justify-center'>
                    <button>Deletar</button>
                </Link>
            </div>
        </div>
    );
}

export default CardCategoria;