import { Contato } from './Contato.model';
import { Endereco } from './Endereco.model';
export class Participante {
    id?: number;
    nome: string;
    nomeFantasia?: string;
    cpf?: string;
    cnpj?: string;
    inscricaoEstadual?: string
    ativo?: boolean;
    dataNascimento?: Date;
    enderecos?: Endereco[];
    contatos?: Contato[];

    constructor() {
        this.nome = '';
        this.enderecos = [];
        this.contatos = [];
    }

}