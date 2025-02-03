import Exercicio from './Exercicio';

export default interface Treino {  
    id: number;
    descricao: string;
    exercicio?: Exercicio | null;  
}
