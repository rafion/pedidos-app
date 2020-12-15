import { Participante } from './Participante.model';
export class Contato {
    id?: number;
    tipo: string;
    nome: string;
    telefone: string;
    email?: string;
    favorito: boolean;
}