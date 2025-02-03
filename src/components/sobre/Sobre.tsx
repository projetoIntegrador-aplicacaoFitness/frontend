import React from "react";
import CardDesenvolvedores from "./carddesenvolvedores/CardDesenvolvedores";
import { Link } from "react-router-dom";

function Sobre() {
  return (
    <>
      <div className="container flex flex-col  items-center bg-black px-4 sm:px-2">
        <div className="bg-yellow-500 w-full mt-16 grid md:grid-cols-2 sm:grid-cols-1 text-center">
          <div className="flex md:flex-row flex-col items-center justify-center my-8 mx-4 ">
            <h2 className="p-8 text-5xl sm:text-4xl font-mono font-thin rounded-2xl">
              Cardanis Fitness
            </h2>
            <ul className="text-start text-4xl sm:text-3xl">
              <li>| Saúde</li>
              <li>| Bem-Estar</li>
              <li>| Tecnologia</li>
            </ul>
          </div>
          <div className="m-4 flex justify-center items-center">
            <img
              className="rounded-2xl max-w-md w-full shadow-2xl object-cover sm:w-auto"
              src="https://ik.imagekit.io/ix39wusls/Imagens%20PI%20Fitness/halteres?updatedAt=1738436341838"
              alt="Dois halteres"
            />
          </div>
        </div>
        <div className="bg-white mt-8 px-8 rounded-xl">
          <h2 className="text-4xl font-thin font-mono">Sobre Cardanis Fit</h2>
        </div>
        <div className="grid md:grid-cols-3 sm:grid-cols-1 gap-4 mt-8 w-full bg-yellow-500 py-8 ">
          <div className="flex flex-col items-center p-4 bg-white rounded-2xl gap-4 shadow-2xl scale-95 hover:scale-105">
            <h2 className="text-lg font-semibold text-yellow-500 bg-black px-8 rounded-xl">
              Missão
            </h2>
            <p className="text-center m-4">
              A Cardanis Fitness nasceu para tornar a atividade física
              acessível, acolhedora e livre de preconceitos. Nossa missão é
              incentivar o bem-estar acima de padrões estéticos, oferecendo uma
              experiência fitness inclusiva para todas as pessoas,
              independentemente de corpo, idade ou nível de condicionamento.
              Acreditamos que o exercício deve ser um momento de autocuidado e
              empoderamento, e não uma obrigação. Por isso, criamos um espaço
              onde cada jornada é valorizada e todos podem se movimentar no seu
              próprio ritmo, com motivação e respeito.
            </p>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-2xl gap-4 shadow-2xl scale-95 hover:scale-110 ">
            <h2 className="text-lg font-semibold text-yellow-500 bg-black px-8 rounded-xl">
              História
            </h2>
            <p className="text-center m-4">
              O time7 recebeu um grande desafio: desenvolver um aplicativo
              fitness inclusivo em poucos dias. Com prazos apertados, bugs
              inesperados e noites mal dormidas, a equipe precisou de muita
              criatividade e colaboração para superar os obstáculos. Apesar das
              dificuldades, a determinação do time falou mais alto. O resultado?
              Cardanis Fitness, uma plataforma acessível e acolhedora, feita
              para todas as pessoas, sem padrões ou exclusões. O que começou
              como um desafio tornou-se um movimento de inclusão e bem-estar.
            </p>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-2xl gap-4 shadow-2xl scale-95 hover:scale-100 ">
            <h2 className="text-lg font-semibold text-yellow-500 bg-black px-8 rounded-xl">
              Valores
            </h2>
            <ul className="m-4 list-disc">
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
          <h2 className="bg-white mt-8 px-8 rounded-xl text-4xl font-thin font-mono">
            Por que escolher Cardanis?
          </h2>
          <div className="bg-yellow-500 grid grid-cols-1 sm:w-2/3 md:w-1/3 rounded-xl py-4">
            <div className="flex flex-col justify-center items-center">
              <p className="m-4 font-semibold text-center">
                 A Cardanis Fitness é mais
                do que um simples aplicativo de exercícios. É um espaço
                inclusivo, acolhedor e sem preconceitos, onde você pode se mover
                no seu ritmo, sem pressões ou padrões irreais. Nós acreditamos
                que toda jornada de bem-estar é única e merece ser celebrada.
                Junte-se a nós hoje e descubra uma experiência fitness feita
                para você, do seu jeito!
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
          <h2 className="bg-white  px-8 rounded-xl text-4xl font-thin font-mono">
            Time7
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
    </>
  );
}

export default Sobre;
