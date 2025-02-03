import { useState } from "react";
import ListaPostagens from "../../components/postagens/listapostagens/ListaPostagens";
import ModalPostagem from "../../components/postagens/modalpostagem/ModalPostagem";

function Home() {
  const [hovered, setHovered] = useState(false);

  return (
    <>
      <div className="relative w-full min-h-screen bg-fixed bg-cover bg-center" style={{ backgroundImage: "url('https://i.postimg.cc/QMvT0m2G/imagemdefundo.jpg')" }}>
        {/* Removed the opacity element */}

        <div className="relative flex justify-center items-center min-h-screen">
          <div className="container text-center text-beige">
            <div className="flex flex-col gap-4 items-center justify-center py-4">
              <h2 className="text-5xl font-bold text-yellow-400 text-shadow-md">
                FIT, o seu aplicativo fitness
              </h2>
              <p className="text-xl text-white text-shadow-sm">
                Criar um treino personalizado nunca foi tão fácil!
              </p>

              <div className="flex justify-around gap-4">
                <ModalPostagem />
              </div>
            </div>
          </div>
        </div>

        <ListaPostagens />
      </div>
    </>
  );
}

export default Home;