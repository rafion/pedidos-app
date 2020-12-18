
export class Endereco {
    id?: number;
    cep?: string;
    logradouro: string;
    complemento?: string;
    bairro: string;
    cidade: string;
    uf: string;
    ibge?: string;
    ddd?: string;
    numero: string;
    tipo: string;
    favorito: boolean;

    constructor() {
        this.id = null,
            this.cep = '',
            this.logradouro = '',
            this.complemento = '',
            this.bairro = '',
            this.cidade = '',
            this.uf = '',
            this.ibge = '',
            this.ddd = '',
            this.numero = '',
            this.tipo = '',
            this.favorito = false

    }

}