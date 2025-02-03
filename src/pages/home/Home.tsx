import { useState } from "react";
import ModalExercicio from "../../components/exercicio/modalexercicio/ModalExercicio";


function Home() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className="relative w-full min-h-screen bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.postimg.cc/QMvT0m2G/imagemdefundo.jpg')" }}
      >
        <main className="relative flex justify-center items-center min-h-screen">
          <div className="container text-center text-white">
            <div className="flex flex-col gap-4 items-center justify-center py-4">
              <h2 className="text-5xl font-bold text-yellow-400 drop-shadow-md">
                FIT, o seu aplicativo fitness
              </h2>
              <p className="text-xl text-gray-200 drop-shadow-sm">
                Criar um treino personalizado nunca foi tão fácil!
              </p>

              <div className="flex justify-around gap-4">
               
              </div>
            </div>
          </div>
        </main>
      </div>

  
    </>
  );
}

export default Home;
