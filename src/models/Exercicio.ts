
import Treino from './Treino';
import Usuario from './Usuario';

export default interface Exercicio {
  id: number;
  titulo: string;
  texto: string;
  data: string;
  treino: Treino | null;  
  usuario: Usuario | null;
}
