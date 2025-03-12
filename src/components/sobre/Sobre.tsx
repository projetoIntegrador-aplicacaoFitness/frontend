import React from "react";
import CardDesenvolvedores from "./carddesenvolvedores/CardDesenvolvedores";
import { Link } from "react-router-dom";

function Sobre() {
  return (
    <>
      <div
        className="relative w-full min-h-screen bg-fixed bg-cover bg-center pt-8"
        style={{
          backgroundImage:
            "url('https://i.postimg.cc/QMvT0m2G/imagemdefundo.jpg')",
        }}
      >
        <div className="w-full max-w-lg px-4 py-2 rounded-2xl shadow-xl container flex flex-col mx-auto items-center bg-gray-800 ">
          <h1 className="text-3xl text-center my-4 text-yellow-400 drop-shadow-md transition duration-300 ease-in-out hover:text-orange-500">
            Conheça a Cardanis Fit
          </h1>
        </div>

        <div className=" flex flex-col w-full items-center bg-black  sm:px-2">
          <div className="bg-yellow-500 w-full mt-16 grid md:grid-cols-2 sm:grid-cols-1 text-center ">
            <div className="flex md:flex-row flex-col items-center justify-center my-8 mx-4 bg-gray-800 rounded-2xl">
              <img
                src="https://ik.imagekit.io/sanmi/Logo-sem%20fundo.png?updatedAt=1738598851003"
                alt="Logo Cardanis"
              />
              <ul className="text-start text-4xl sm:text-3xl text-yellow-400 transition duration-300 hover:text-orange-500 pb-10 md:p-0">
                <li>| Saúde</li>
                <li>| Bem-Estar</li>
                <li>| Tecnologia</li>
              </ul>
            </div>
            <div className="m-4 flex justify-center items-center">
              <img
                className="rounded-2xl max-w-md w-full shadow-2xl object-cover sm:w-auto "
                src="https://ik.imagekit.io/ix39wusls/Imagens%20PI%20Fitness/halteres?updatedAt=1738436341838"
                alt="Dois halteres"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4 mt-8 w-full bg-yellow-500 py-8 ">
            <div className="flex flex-col items-center p-4 bg-white rounded-2xl gap-4 shadow-2xl scale-95 hover:scale-105">
              <h2 className="text-lg font-semibold text-yellow-500 bg-black-600 px-8 rounded-xl">
                Missão
              </h2>
              <p className="text-center m-4 text-black-200">
                A Cardanis Fit© nasceu para tornar a atividade física acessível,
                acolhedora e livre de preconceitos. Nossa missão é incentivar o
                bem-estar acima de padrões estéticos, oferecendo uma experiência
                fitness inclusiva para todas as pessoas, independentemente de
                corpo, idade ou nível de condicionamento. Acreditamos que o
                exercício deve ser um momento de autocuidado e empoderamento, e
                não uma obrigação. Por isso, criamos um espaço onde cada jornada
                é valorizada e todos podem se movimentar no seu próprio ritmo,
                com motivação e respeito.
              </p>
            </div>
            <div className="flex flex-col items-center p-4 bg-white rounded-2xl gap-4 shadow-2xl scale-95 hover:scale-110 ">
              <h2 className="text-lg font-semibold text-yellow-500 bg-black-600 px-8 rounded-xl">
                História
              </h2>
              <p className="text-center m-4 text-black-200">
                O Time7 recebeu um grande desafio: desenvolver um aplicativo
                fitness inclusivo em poucos dias. Com prazos apertados, bugs
                inesperados e noites maldormidas, a equipe precisou de muita
                criatividade e colaboração para superar os obstáculos. Apesar
                das dificuldades, a determinação do time falou mais alto. O
                resultado? Cardanis Fit©, uma plataforma acessível e acolhedora,
                feita para todas as pessoas, sem padrões ou exclusões. O que
                começou como um desafio tornou-se um movimento de inclusão e
                bem-estar.
              </p>
            </div>
            <div className="flex flex-col items-center p-4 bg-white rounded-2xl gap-4 shadow-2xl scale-95 hover:scale-100 ">
              <h2 className="text-lg font-semibold text-yellow-500 bg-black-600 px-8 rounded-xl">
                Valores
              </h2>
              <ul className="m-4 list-disc text-black-200">
                <li> Respeito para Todos </li>
                <li> Inclusão para Todos</li>
                <li> Respeito à Individualidade</li>
                <li> Comunidade de Apoio</li>
                <li> Empoderamento</li>
                <li> Educação e Conscientização</li>
                <li> Saúde além da Estética</li>
                <li> Evolução sem Comparação</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center gap-8">
            <h2 className="bg-white mt-8 px-8 rounded-xl text-4xl font-thin font-mono text-black-600">
              Por que escolher a Cardanis Fit?
            </h2>
            <div className="bg-yellow-500 grid grid-cols-1 sm:w-2/3 md:w-1/3 rounded-xl py-4">
              <div className="flex flex-col justify-center items-center">
                <p className="m-4 font-semibold text-center">
                  A Cardanis Fit© é mais do que um simples aplicativo de
                  exercícios. É um espaço inclusivo, acolhedor e sem
                  preconceitos, onde você pode se mover no seu ritmo, sem
                  pressões ou padrões irreais. Nós acreditamos que toda jornada
                  de bem-estar é única e merece ser celebrada. Junte-se a nós
                  hoje e descubra uma experiência fitness feita para você, do
                  seu jeito!
                </p>
                <Link
                  to="/cadastro"
                  className="font-bold text-2xl hover:cursor-pointer hover:underline"
                >
                  Experimente agora!
                </Link>
              </div>
            </div>
          </div>
          <div className="bg-white mt-8 px- rounded-xl">
            <h2 className="bg-white  px-8 rounded-xl text-4xl font-thin font-mono text-black-600">
              Este site foi desenvolvido por: Time7
            </h2>
          </div>
          <div className="grid md:grid-cols-5 sm:grid-cols-1 gap-8 my-8">
            <CardDesenvolvedores
              nome="Caique Gomes"
              foto="https://ik.imagekit.io/ix39wusls/Fotos%20PI/caique%20rec?updatedAt=1738073986570"
              linkedin="https://www.linkedin.com/in/cttcaiquegomes/"
              github="https://github.com/Caiqe"
            />
            <CardDesenvolvedores
              nome="Daniel Lima"
              foto="https://ik.imagekit.io/ix39wusls/Fotos%20PI/daniel%20rec?updatedAt=1738073986046"
              linkedin="https://www.linkedin.com/in/danieldossantoslima/"
              github="https://github.com/DanielDosSantosLima"
            />
            <CardDesenvolvedores
              nome="Daniella Santana"
              foto="https://ik.imagekit.io/ix39wusls/Fotos%20PI/daniela%20rec?updatedAt=1738073986769"
              linkedin="https://www.linkedin.com/in/adaniellasantana/"
              github="https://github.com/adanisantana"
            />
            <CardDesenvolvedores
              nome="Rodrigo Oliveira"
              foto="https://ik.imagekit.io/ix39wusls/Fotos%20PI/rodrgo%20rec?updatedAt=1738073986681"
              linkedin="https://www.linkedin.com/in/rodrigodevv/"
              github="https://github.com/RPX31"
            />
            <CardDesenvolvedores
              nome="Sabrina Santos"
              foto="https://ik.imagekit.io/ix39wusls/Fotos%20PI/sabrina%20rec?updatedAt=1738073986447"
              linkedin="https://www.linkedin.com/in/sabrina-santoslima/"
              github="https://github.com/sabrinasanmi"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Sobre;
