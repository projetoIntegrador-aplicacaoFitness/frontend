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
          className="w-11/12 h-56 object-cover rounded-2xl mx-auto mt-3"
          src={exercicio.foto}
          alt={"Foto: " + exercicio.nome}
        />
        <div className="flex flex-col items-center justify-center my-4 text-black-200">
          <p className=" font-semibold">{exercicio.nome}</p>
          <hr className="border border-black w-2/3 mb-2" />

          <p className="font-bold">Recomendações:</p>
          <div className="flex flex-row justify-around w-full text-left p-2">
            <p>Nº Séries: {exercicio.serie}</p>
            <p>Nº Repetições: {exercicio.repeticao}</p>
          </div>

          <div className="flex flex-row justify-around w-full text-left p-2">
            <p>Peso: {exercicio.peso} Kgs</p>
            <p>Descanso: {exercicio.descanso} minuto(s)</p>
          </div>
        </div>

        <div className="flex flex-row justify-around">
          <Link
            to={`/editarexercicio/${exercicio.id}`}
            className="w-full text-slate-100 bg-green-700 
                        hover:bg-green-600 flex items-center justify-center py-2"
          >
            <h2>Editar</h2>
          </Link>
          <Link
            to={`/deletarexercicio/${exercicio.id}`}
            className="text-slate-100 bg-red-700 hover:bg-red-600 w-full py-2 
            flex items-center justify-center"
          >
            <button>Deletar</button>
          </Link>
        </div>
      </div>
    </>
  );
}

export default CardExercicio;
