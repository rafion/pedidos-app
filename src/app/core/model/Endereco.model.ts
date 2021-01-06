
export class Endereco {
    id?: number;
    cep?: string;
    logradouro: string;
    complemento?: string;
    bairro: string;
    municipio: string;
    codigo_ibge: string;
    uf: string;
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
            this.municipio = '',
            this.codigo_ibge = '';
        this.uf = '',
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