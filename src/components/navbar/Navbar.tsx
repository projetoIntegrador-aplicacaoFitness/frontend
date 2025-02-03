import { ReactNode, useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { ToastAlerta } from "../../utils/ToastAlerta";
import { FaBars, FaInfoCircle } from 'react-icons/fa';
import { FaDumbbell } from "react-icons/fa6";
import { CgProfile } from "react-icons/cg";
import { GiStrongMan } from "react-icons/gi";

function Navbar() {
    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBlinking, setIsBlinking] = useState(false);

    useEffect(() => {
        const blinkInterval = setInterval(() => {
            setIsBlinking(prev => !prev);
        }, 1000);

        return () => clearInterval(blinkInterval);
    }, []);

    function logout() {
        handleLogout();
        ToastAlerta('O Usuário foi desconectado com sucesso!', 'info');
        navigate('/');
    }

    let component: ReactNode;

    if (usuario.token !== "") {
        component = (
            <div className="font-sunflower">
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`fixed top-4 left-4 z-50 p-2 rounded-full transition-all duration-300 ease-in-out
                                ${isBlinking ? 'bg-orange-400 text-white' : 'bg-white text-orange-400'}
                                hover:bg-orange-500 hover:text-white`}
                >
                    <FaBars size={24} />
                </button>

                <nav className={`fixed top-0 left-0 h-full w-64 bg-black-600 transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out z-40`}>
                    <div className="p-4">
                        <Link to="/home">
                            <img
                                src="https://ik.imagekit.io/sanmi/Logo-sem%20fundo.png?updatedAt=1738598851003"
                                alt="Logo"
                                className="w-auto h-auto mb-8"
                            />
                        </Link>

                        <div className="space-y-4">
                            <div className="group">
                                <span className="text-white text-lg flex items-center cursor-pointer">
                                    <FaDumbbell className="mr-2" />
                                    <span>TREINOS</span>
                                </span>
                                <div className="ml-6 mt-2 space-y-2 hidden group-hover:block">
                                    <Link to="/treino" className="block text-peach-200 hover:text-orange-400">Ver Treinos</Link>
                                    <Link to="/exercicios" className="block text-peach-200 hover:text-orange-400">Cadastrar Treino</Link>
                                </div>
                            </div>

                            <div className="group">
                                <span className="text-white text-lg flex items-center cursor-pointer">
                                    <GiStrongMan className="mr-2" />
                                    <span>EXERCÍCIOS</span>
                                </span>
                                <div className="ml-6 mt-2 space-y-2 hidden group-hover:block">
                                    <Link to="/exercicio" className="block text-peach-200 hover:text-orange-400">Ver Exercícios</Link>
                                    <Link to="/cadastrarCategoria" className="block text-peach-200 hover:text-orange-400">Cadastrar Exercício</Link>
                                </div>
                            </div>
                            <div className="group">
                                <span className="text-white text-lg flex items-center cursor-pointer">
                                    <CgProfile className="mr-2" />
                                    <span>PERFIL</span>
                                </span>
                                <div className="ml-6 mt-2 space-y-2 hidden group-hover:block">
                                    <Link to="/perfil" className="block text-peach-200 hover:text-orange-400">Ver Perfil</Link>
                                </div>
                            </div>
                            <div className="group">
                                <span className="text-white text-lg flex items-center cursor-pointer">
                                    <FaInfoCircle className="mr-2" />
                                    <span>SOBRE</span>
                                </span>
                                <div className="ml-6 mt-2 space-y-2 hidden group-hover:block">
                                    <Link to="/sobre" className="block text-peach-200 hover:text-orange-400">Conheça a Cardanis</Link>
                                </div>
                            </div>
                        </div>

                        <button onClick={logout} className="absolute bottom-4 left-4 text-white hover:text-orange-400">
                            Logout
                        </button>
                    </div>
                </nav>

                <div className={`fixed inset-0 bg-black-200 opacity-50 z-30 ${isMenuOpen ? 'block' : 'hidden'}`} onClick={() => setIsMenuOpen(false)}></div>
            </div>
        );
    }

    return <>{component}</>;
}

export default Navbar;
