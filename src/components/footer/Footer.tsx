import { GithubLogo, Info, InstagramLogo, LinkedinLogo } from '@phosphor-icons/react'
import { ReactNode, useContext } from 'react'
import { AuthContext } from '../../contexts/AuthContext'
import { Link } from 'react-router-dom'

function Footer() {

    let data = new Date().getFullYear()

    const { usuario } = useContext(AuthContext)

    let component: ReactNode

   
    return (
        <>
            <div className="flex justify-center bg-dark text-beige">
                <div className="container flex flex-col items-center py-4">
                    <p className='text-xl font-bold'>
                        Blog Pessoal Generation | Copyright: {data}
                    </p>
                    <p className='text-lg'>Feito por Sabrina S. Lima</p>
                    <div className='flex gap-2'>
                        <a href="https://www.linkedin.com/in/sabrina-santoslima/" target="_blank">
                            <LinkedinLogo size={48} weight='bold' className="transition-colors duration-300 hover:text-pink" />
                        </a>
                        <a href="https://github.com/sabrinasanmi?tab=repositories" target="_blank">
                            <GithubLogo size={48} weight='bold'  className="transition-colors duration-300 hover:text-blue" />
                        </a>
                        <a href="https://www.instagram.com/sanmisabrina/" target="_blank">
                            <InstagramLogo size={48} weight='bold' className="transition-colors duration-300 hover:text-pink" />
                        </a>
                        <Link to=''><Info size={48} weight="bold" /></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer;
