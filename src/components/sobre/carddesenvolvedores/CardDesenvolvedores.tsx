import React from 'react'

interface CardDesenvolvedoresProps{
    nome: string,
    foto: string,
    linkedin: string,
    github: string,
}
function CardDesenvolvedores({nome, foto, linkedin, github} : CardDesenvolvedoresProps) {
  return (
    <>
      <div className="max-w-sm rounded-2xl overflow-hidden shadow-2xl p-4 bg-white     ">
        <img
          className="w-full h-48 object-cover rounded-4xl rounded-2xl"
          src={foto}
          alt={'Foto: '+nome}
        />
        <div className='flex flex-col items-center justify-center mt-2 text-black-600'>
        <p>{nome}</p>
        </div>
        
        <div className=" flex flex-row gap-2 py-4  rounded-4xl px-2  ">
          <a href={linkedin} target='_blank'><img  className='rounded-lg hover:scale-110' src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="Logo LinkedIn" /></a>
          <a href={github} target='_blank'><img className='rounded-lg hover:scale-110' src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="Logo GitHub" /></a>
        </div>
        
      </div>
    </>
  )
}

export default CardDesenvolvedores