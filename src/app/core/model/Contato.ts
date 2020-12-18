import { Participante } from './Participante.model';
export class Contato {
    id?: number;
    tipo: string;
    nome: string;
    telefone: string;
    email?: string;
    favorito: boolean;

    constructor() {
        this.id = null;
        this.tipo = '';
        this.nome = '';
        this.telefone = '';
        this.email = ''
        this.favorito = false;
    }
}