import { Participante } from './Participante.model';
export class Contato {
    id?: number;
    tipo: string;
    nome: string;
    telefone: string;
    email?: string;
    favorito: boolean;
    participanteId?: number;

    constructor() {
        this.id = null;
        this.tipo = '';
        this.nome = '';
        this.telefone = '';
        this.email = ''
        this.favorito = false;
    }
    static tipo = {
        pessoal: 'PESSOAL',
        comercial: 'COMERCIAL'
    }


}