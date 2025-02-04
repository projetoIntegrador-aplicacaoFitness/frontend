import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
import { ToastAlerta } from '../../utils/ToastAlerta';

function Perfil() {
  const navigate = useNavigate();
  const { usuario } = useContext(AuthContext);

  const [peso, setPeso] = useState(usuario?.peso || ''); 
  const [altura, setAltura] = useState(usuario?.altura || ''); 
  const [imc, setImc] = useState(usuario?.imc || ''); 
  const [nivelSaude, setNivelSaude] = useState('');

  useEffect(() => {
    if (!usuario?.token) {
      ToastAlerta('Você precisa estar logado!','info');
      navigate("/");
    }
  }, [usuario?.token, navigate]);

  useEffect(() => {
    function calcularIMC() {
      const pesoNum = parseFloat(peso);
      const alturaNum = parseFloat(altura);

      if (!isNaN(pesoNum) && !isNaN(alturaNum) && alturaNum > 0) {
        const alturaMetros = alturaNum / 100;
        const imcCalculado = pesoNum / (alturaMetros * alturaMetros);
        setImc(imcCalculado.toFixed(2));

        if (imcCalculado < 18.5) {
          setNivelSaude('Abaixo do peso');
        } else if (imcCalculado < 25) {
          setNivelSaude('Peso normal');
        } else if (imcCalculado < 30) {
          setNivelSaude('Sobrepeso');
        } else if (imcCalculado < 35) {
          setNivelSaude('Obesidade grau I');
        } else if (imcCalculado < 40) {
          setNivelSaude('Obesidade grau II');
        } else {
          setNivelSaude('Obesidade grau III');
        }
      } else {
        setImc('');
        setNivelSaude('');
      }
    }

    calcularIMC();
  }, [peso, altura]);

  const getNivelSaudeStyle = () => {
    switch (nivelSaude) {
      case 'Peso normal':
        return 'font-bold text-green-500';
      case 'Sobrepeso':
        return 'font-bold text-orange-500';
      case 'Obesidade grau I':
        return 'font-bold text-red-400';
      case 'Obesidade grau II':
        return 'font-bold text-red-600';
      case 'Obesidade grau III':
        return 'font-bold text-red-800';
      default:
        return 'text-gray-700';
    }
  };

  return (
    <div className="container mx-auto mt-8 p-4 rounded-lg shadow-lg bg-white max-w-md" style={{ backgroundColor: 'var(--color-peach-200)' }}>
      <div className="flex flex-col items-center">
        <img
          className="rounded-md w-40 h-40 object-cover border-4 border-white mb-4"
          src={usuario?.foto}
          alt={`Foto de perfil de ${usuario?.nome}`}
        />
        <div className="text-center" style={{ color: 'var(--color-black-200)' }}>
          <h2 className="text-2xl font-bold mb-2">{usuario?.nome}</h2>
          <p className="mb-1">Email: {usuario?.usuario}</p>
          <div className="flex items-center justify-center">
            <div className="mr-4">
              <label htmlFor="peso" className="block">Peso (kg):</label>
              <input
                type="number"
                id="peso"
                className="border border-gray-300 rounded px-2 py-1 w-20"
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                style={{ color: 'var(--color-black-200)' }}
              />
            </div>
            <div>
              <label htmlFor="altura" className="block">Altura (cm):</label>
              <input
                type="number"
                id="altura"
                className="border border-gray-300 rounded px-2 py-1 w-20"
                value={altura}
                onChange={(e) => setAltura(e.target.value)}
                style={{ color: 'var(--color-black-200)' }}
              />
            </div>
          </div>

          <div className="mt-4">
            <p>Seu Índice de Massa Corporal (IMC) de hoje está em:</p>
            <p className="text-3xl font-bold">{imc || "-"}</p>
          </div>

          <p className={`mt-2 ${getNivelSaudeStyle()}`}>Classificação: {nivelSaude || "-"}</p>

          <div className="mt-4 text-center">
            <p className="font-bold">Tabela de IMC (Índice de Massa Corporal) para adultos:</p>
            <ul className="list-disc pl-5 text-left">
              <li>IMC entre 18,5 e 24,9: peso normal</li>
              <li>IMC entre 25 e 29,9: sobrepeso</li>
              <li>IMC entre 30 e 34,9: obesidade grau I</li>
              <li>IMC entre 35 e 39,9: obesidade grau II</li>
              <li>IMC maior que 40: obesidade grau III</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;
