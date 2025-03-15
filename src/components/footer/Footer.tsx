import { GithubLogo, Info, FacebookLogo, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react'
import { ReactNode, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'

function Footer() {

    let data = new Date().getFullYear()

    const { usuario } = useContext(AuthContext)

    let component: ReactNode

    return (

        <footer className="bg-black-600 text-white py-4  rounded-t-xl">
            <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center">

                <div className="mb-4 md:mb-0">
                    <span className="font-semibold">© {data} Cardanis</span> | Todos os direitos reservados.
                </div>

                <div className="text-white hover:text-lime-green flex space-x-6 mb-4 md:mb-0">
                    <a href="#" >Termos de Uso</a>
                </div>
                <div className="text-white hover:text-lime-green flex space-x-6 mb-4 md:mb-0">
                    <a href="#" >Política de Privacidade</a>
                </div>

                <div className="flex space-x-4">
                    <a href="https://www.facebook.com/generationbrasil" target="_blank" className="text-white hover:text-orange-400">
                        <FacebookLogo size={24} />
                    </a>
                    <a href="https://github.com/projetoIntegrador-aplicacaoDelivery/FrontEnd" target="_blank" className="text-white hover:text-orange-400">
                        <GithubLogo size={24} />
                    </a>
                    <a href="https://www.instagram.com/generationbrasil" target="_blank" className="text-white hover:text-orange-400">
                        <InstagramLogo size={24} />
                    </a>
                    <a href="https://www.linkedin.com/school/generationbrasil" target="_blank" className="text-white hover:text-orange-400">
                        <LinkedinLogo size={24} />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;
