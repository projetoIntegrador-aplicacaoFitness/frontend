import { useContext, useEffect, useState } from "react";
import { DNA } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Categoria from "../../models/Categoria";
import CardCategoria from "./CardCategoria";
import { buscar } from "../../services/Service";
import { ToastAlerta } from "../../utils/ToastAlerta";

function ListaCategoria() {

    const navigate = useNavigate();
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    async function buscarCategoria() {
        try {
            await buscar('/categorias', setCategorias, {
                headers: { Authorization: token }
            });
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
            }
        }
    }

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'info');
            navigate('/');
        }
    }, [token]);

    useEffect(() => {
        if (token === '') {
            ToastAlerta('Você precisa estar logado!', 'info');
            navigate('/');
            return;
        }
        buscarCategoria();
    }, []);

    return (
        <>
            <div
                className="relative w-full min-h-screen bg-fixed bg-cover bg-center"
                style={{
                    backgroundImage:
                        "url('https://i.postimg.cc/QMvT0m2G/imagemdefundo.jpg')",
                }}
            >
            <div className="w-full max-w-lg px-4 py-2 rounded-2xl shadow-xl container flex flex-col mx-auto items-center bg-gray-800">
                <h1 className="text-3xl text-center my-4 text-yellow-400 drop-shadow-md transition duration-300 ease-in-out hover:text-orange-500">
                Treinos
                </h1>
            </div>

                {categorias.length === 0 && (
                    <DNA
                        visible={true}
                        height="200"
                        width="200"
                        ariaLabel="dna-loading"
                        wrapperStyle={{}}
                        wrapperClass="dna-wrapper mx-auto"
                    />
                )}


                <div className="flex justify-center w-full my-4">
                    <div className="container flex flex-col">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {categorias.map((categoria) => (
                                <CardCategoria key={categoria.id} categoria={categoria} />
                            ))}
                        </div>
                    </div>
                </div>
                <div className="flex justify-center p-4 space-x-4">
                    <Link className='border rounded px-8 py-4 hover:bg-yellow-500 bg-yellow-700 text-black font-bold py-2 px-4 rounded' to="/cadastrar-treino">
                        Novo Treino
                    </Link>
                </div>
            </div>
        </>
    );
}

export default ListaCategoria;
