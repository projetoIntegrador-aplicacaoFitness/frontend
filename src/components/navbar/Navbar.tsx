import { ReactNode, useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Navbar() {

    const navigate = useNavigate()

    const { usuario, handleLogout } = useContext(AuthContext)

    function logout() {

        handleLogout()
        ToastAlerta('O Usuário foi desconectado com sucesso!', 'info')
        navigate('/')
    }
    
    let component: ReactNode

    if (usuario.token !== "") {

        component = (

<div className='w-full bg-beige text-dark flex justify-center py-4'>
    <div className="container flex justify-between text-lg">
        <Link to='/home' className="text-2xl font-bold hover:font-normal hover:text-blue">
            Blog Pessoal
        </Link>

        <div className='flex gap-4'>
            <Link to='/postagens' className='font-bold hover:font-normal hover:text-pink'>
                Postagens
            </Link>
            <Link to='/temas' className='font-bold hover:font-normal hover:text-pink'>
                Temas
            </Link>
            <Link to='/cadastrartema' className='font-bold hover:font-normal hover:text-pink'>
                Cadastrar tema
            </Link>
            <Link to='/perfil' className='font-bold hover:font-normal hover:text-pink'>
                Perfil
            </Link>
            <Link to='' onClick={logout} className='font-bold hover:font-normal hover:text-pink'>
                Sair
            </Link>
        </div>
    </div>
</div>

        )

    }

    return (
        <>
            { component }
        </>
    )
}

export default Navbar;
