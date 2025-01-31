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
                        className='border rounded px-8 py-4 hover:bg-pink hover:text-beige'>
                        Novo Exercício  
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
