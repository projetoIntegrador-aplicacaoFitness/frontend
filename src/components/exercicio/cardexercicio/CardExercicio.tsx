import { Link } from "react-router-dom";
import Exercicio from "../../../models/Exercicio";

interface CardExercicioProps {
  exercicio: Exercicio;
}

function CardExercicio({ exercicio }: CardExercicioProps) {
  return (
    <>
      <div className="max-w-sm rounded-2xl overflow-hidden shadow-2xl  bg-white">
        <img
          className="w-30 h-56 object-cover rounded-4xl rounded-2xl mx-auto"
          src={exercicio.foto}
          alt={"Foto: " + exercicio.nome}
        />
        <div className="flex flex-col items-center justify-center my-4">
          <p className="text-black-200 font-semibold">{exercicio.nome}</p>
        </div>

        <div className="flex flex-row justify-around">
          <Link
            to={`/editarexercicio/${exercicio.id}`}
            className="w-full text-slate-100 bg-green-700 
                        hover:bg-green-600 flex items-center justify-center py-2">
            <h2>Editar</h2>
          </Link>
          <Link
            to={`/deletarexercicio/${exercicio.id}`}
            className="text-slate-100 bg-red-700 hover:bg-red-600 w-full py-2 
            flex items-center justify-center"> 
            <button>Deletar</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CardExercicio;
