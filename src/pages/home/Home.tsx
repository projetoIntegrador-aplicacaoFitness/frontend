import { useState } from "react";
import ListaPostagens from "../../components/postagens/listapostagens/ListaPostagens";
import ModalPostagem from "../../components/postagens/modalpostagem/ModalPostagem";

function Home() {
    const [hovered, setHovered] = useState(false);

    return (
        <>
            <div className="bg-black flex justify-center">
                <div className='container grid grid-cols-2 text-beige'>
                    <div className="flex flex-col gap-4 items-center justify-center py-4">
                        <h2 className='text-5xl font-bold'>
                            Olá! Que bom ter você aqui
                        </h2>
                        <p className='text-xl'>
                            Expresse aqui seus pensamentos e opiniões.
                        </p>

                        <div className="flex justify-around gap-4">
                            <div className="flex justify-around gap-4">
                                <ModalPostagem />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-center ">
                        <img
                            src="https://ik.imagekit.io/sanmi/Designer%20(3).png?updatedAt=1738027487323"
                            alt="Imagem de uma mulher segurando um notebook"
                            className={`w-3/4 ${hovered ? "grayscale-0" : "grayscale"} transition-filter duration-500`}
                            aria-label="Imagem de uma mulher vestindo uma camisa listrada segurando um notebook contra um fundo amarelo"
                            onMouseEnter={() => setHovered(true)}
                            onMouseLeave={() => setHovered(true)}
                        />
                    </div>
                </div>
            </div>

            <ListaPostagens />
        </>
    );
}

export default Home;
