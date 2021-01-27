import { Produto } from './Produto.model';
export class CodBarra {

    id?: number;
    produto?: Produto;
    codBarra: string;
    unidade: string;
    fator: number;
    ativo: boolean;
    favorito: boolean;


    constructor() {
        this.id = null,
            this.codBarra = '',
            this.produto = null,
            this.ativo = true,
            this.fator = null,
            this.unidade = '',
            this.favorito = false
    }

}