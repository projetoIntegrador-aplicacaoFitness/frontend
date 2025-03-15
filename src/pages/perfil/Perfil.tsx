import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";

function Perfil() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  const [peso, setPeso] = useState(usuario?.peso || "");
  const [altura, setAltura] = useState(usuario?.altura || "");
  const [imc, setImc] = useState("");
  const [nivelSaude, setNivelSaude] = useState("");

  useEffect(() => {
    if (!usuario?.token) {
      ToastAlerta("Você precisa estar logado!", "info");
      navigate("/");
    }
  }, [usuario?.token, navigate]);

  useEffect(() => {
    function calcularIMC() {
      const pesoNum = parseFloat(String(peso));
      const alturaNum = parseFloat(String(altura));

      if (!isNaN(pesoNum) && !isNaN(alturaNum) && alturaNum > 0) {
        const alturaMetros = alturaNum / 100;
        const imcCalculado = pesoNum / (alturaMetros * alturaMetros);
        setImc(imcCalculado.toFixed(2));

        if (imcCalculado < 18.5) {
          setNivelSaude("Abaixo do peso");
        } else if (imcCalculado < 25) {
          setNivelSaude("Peso normal");
        } else if (imcCalculado < 30) {
          setNivelSaude("Sobrepeso");
        } else if (imcCalculado < 35) {
          setNivelSaude("Obesidade grau I");
        } else if (imcCalculado < 40) {
          setNivelSaude("Obesidade grau II");
        } else {
          setNivelSaude("Obesidade grau III");
        }
      } else {
        setImc("");
        setNivelSaude("");
      }
    }

    calcularIMC();
  }, [peso, altura]);

  return (
    <div
      className="relative w-full min-h-screen bg-fixed bg-cover bg-center pt-8"
      style={{
        backgroundImage:
          "url('https://i.postimg.cc/QMvT0m2G/imagemdefundo.jpg')",
      }}
    >
      <div className="w-full max-w-lg px-4 py-2 rounded-2xl shadow-xl container flex flex-col mx-auto items-center bg-gray-800">
        <div className="container mx-auto p-2 rounded-lg shadow-lg max-w-md">
          <h1 className="text-3xl text-center my-4 text-yellow-400">Perfil</h1>
          <div className="flex flex-col items-center">
            <img
              className="rounded-md w-40 h-40 object-cover border-4 border-white mb-4"
              src={usuario?.foto}
              alt={`Foto de perfil de ${usuario?.nome}`}
            />
            <h2 className="text-2xl font-bold mb-2">{usuario?.nome}</h2>
            <p className="mb-1">Email: {usuario?.usuario}</p>
            <div className="flex items-center justify-center">
              <div className="mr-4 text-black-200">
                <label htmlFor="peso" className="text-white block">
                  Peso (kg):
                </label>
                <input
                  type="number"
                  id="peso"
                  className="border border-gray-300 rounded px-2 py-1 w-20"
                  value={peso}
                  onChange={(e) => setPeso(e.target.value)}
                  min="0"
                />
              </div>
              <div className="text-black-200">
                <label htmlFor="altura" className="text-white block">
                  Altura (cm):
                </label>
                <input
                  type="number"
                  id="altura"
                  className="border border-gray-300 rounded px-2 py-1 w-20"
                  value={altura}
                  onChange={(e) => setAltura(e.target.value)}
                  min="0"
                />
              </div>
            </div>
            <div className="mt-4 flex flex-col justify-center items-center">
              <p>Seu Índice de Massa Corporal (IMC) de hoje está em:</p>
              <p className="text-3xl font-bold">{imc || "-"}</p>
            </div>
            <p
              className={`mt-2 font-bold ${
                nivelSaude === "Peso normal"
                  ? "text-green-500"
                  : nivelSaude.includes("Obesidade")
                  ? "text-red-500"
                  : nivelSaude === "Sobrepeso"
                  ? "text-orange-500"
                  : "text-gray-700"
              }`}
            >
              Classificação: {nivelSaude || "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
