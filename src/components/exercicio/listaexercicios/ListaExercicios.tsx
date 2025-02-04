import { useNavigate } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { buscar } from "../../../services/Service";
import { DNA } from "react-loader-spinner";
import Exercicio from "../../../models/Exercicio";
import CardExercicio from "../cardexercicio/CardExercicio";
import { ToastAlerta } from "../../../utils/ToastAlerta";

function ListaExercicios() {
  const navigate = useNavigate();

  const [exercicios, setExercicios] = useState<Exercicio[]>([]);

  const { usuario, handleLogout } = useContext(AuthContext);
  const token = usuario.token;

  async function buscarExercicios() {
    try {
      await buscar("/exercicios", setExercicios, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error: any) {
      if (error.toString().includes("403")) {
        handleLogout();
      }
    }
  }

  useEffect(() => {
    if (token === "") {
      ToastAlerta("Você precisa estar logado",'info');
      navigate("/");
    }
  }, [token]);

  useEffect(() => {
    buscarExercicios();
  }, [exercicios.length]);

  return (
    <>
      {exercicios.length === 0 && (
        <DNA
          visible={true}
          height="200"
          width="200"
          ariaLabel="dna-loading"
          wrapperStyle={{}}
          wrapperClass="dna-wrapper mx-auto"
        />
      )}
      <div
        className="container mx-auto my-4 
                grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {exercicios.map((exercicio) => (
          <CardExercicio key={exercicio.id} exercicio={exercicio} />
        ))}
      </div>
    </>
  );
}

export default ListaExercicios;
