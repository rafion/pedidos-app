
export class Endereco {
    id?: number;
    cep?: string;
    logradouro: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    uf: string;
    cidade_id?: string;
    ddd?: string;
    numero: string;
    tipo: string;
    favorito: boolean;
    participanteId?: number;

    constructor() {
        this.id = null,
            this.cep = '',
            this.logradouro = '',
            this.complemento = '',
            this.bairro = '',
            this.cidade = '',
            this.uf = '',
            this.cidade_id = '',
            this.ddd = '',
            this.numero = '',
            this.tipo = '',
            this.favorito = false

    }

    static tipo = {
        residencial: 'RESIDENCIAL',
        comercial: 'COMERCIAL'
    }

}