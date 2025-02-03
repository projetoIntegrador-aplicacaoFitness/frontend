import Popup from 'reactjs-popup';


import 'reactjs-popup/dist/index.css';
import './ModalExercicio.css'
import FormExercicio from '../formexercicio/FormExercicio';

function ModalExercicio() {
    return (
        <>
            <Popup 
                trigger={
                    <button 
                        className='border rounded px-4 py-2 hover:bg-white hover:text-indigo-800'>
                        Novo Exercício
                    </button>
                }
                className='bg-black-600' modal
            >
                <FormExercicio />
            </Popup>
        </>
    );
}

export default ModalExercicio;