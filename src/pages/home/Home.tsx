import { useState } from "react";
import ModalExercicio from "../../components/exercicio/modalpostagem/ModalExercicio";

function Home() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div
        className="relative w-full min-h-screen bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('https://i.postimg.cc/hP5hvrS6/imagemdefundo2.jpg')" }}
      >
        <main className="relative flex flex-col justify-center items-center min-h-screen gap-8">
          <div className="container flex flex-col items-center justify-center text-white">
            <div className="flex flex-col items-center mb-4">
              <div className="rounded-lg shadow-lg overflow-hidden">
                <img
                  src="https://i.postimg.cc/1XghjDLV/iconecomfundo.png"
                  alt="Logo"
                  style={{ width: "100px" }}
                  className="rounded-md"
                />
              </div>
              <h2 className="text-5xl font-bold text-yellow-400 drop-shadow-md text-center mt-2 shadow-lg">
                Cardanis, o seu aplicativo fitness!
              </h2>
            </div>
            <div className="flex flex-col gap-4 items-center justify-center py-4">
              <p className="text-xl text-gray-200 drop-shadow-sm text-center shadow-lg">
                Criar um treino personalizado nunca foi tão fácil!
              </p>
              <div className= "flex justify-around gap-4">
                <ModalExercicio />
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Home;