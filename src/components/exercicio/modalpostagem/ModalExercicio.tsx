import Popup from 'reactjs-popup';

import 'reactjs-popup/dist/index.css';
import './ModalExercicio.css';  
import FormExercicio from '../formexercicio/FormExercicio';


function ModalExercicio() {  
    return (
        <>
            <Popup
                trigger={
                    <button 
                        className='border rounded px-8 py-4 hover:bg-yellow-500 bg-yellow-700 text-black font-bold py-2 px-4 rounded'>
                        Novo Treino
                    </button>
                }
                modal
            >
                <FormExercicio/>  
            </Popup>
        </>
    );
}

export default ModalExercicio; 
