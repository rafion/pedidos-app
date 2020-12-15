import { Contato } from './Contato';
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
    endereco?: Endereco;
    contato?: Contato;

}