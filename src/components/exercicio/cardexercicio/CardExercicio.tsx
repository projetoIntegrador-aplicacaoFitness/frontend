import { Link } from "react-router-dom";
import Exercicio from "../../../models/Exercicio";

interface CardExercicioProps {
  exercicio: Exercicio;
}

function CardExercicio({ exercicio }: CardExercicioProps) {
  return (
    <>
      <div className="max-w-sm rounded-2xl overflow-hidden shadow-2xl  bg-white     ">
        <img
          className="w-full h-48 object-cover rounded-4xl rounded-2xl"
          src={exercicio.foto}
          alt={"Foto: " + exercicio.nome}
        />
        <div className="flex flex-col items-center justify-center my-4">
          <p className="text-black-200 font-semibold">{exercicio.nome}</p>
        </div>

        <div className="flex flex-row justify-around">
          <Link
            to={`/editarexercicio/${exercicio.id}`}
            className='w-full text-slate-100 bg-indigo-400 hover:bg-indigo-800 
                        flex items-center justify-center py-2'>
            <h2>Editar</h2>
          </Link>
          <Link
            to={`/deletarexercicio/${exercicio.id}`}
            className='text-slate-100 bg-red-400 hover:bg-red-700 w-full 
            flex items-center justify-center py-2'> 
          
            <button>Deletar</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CardExercicio;
