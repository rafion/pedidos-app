
export interface Endereco {
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

}