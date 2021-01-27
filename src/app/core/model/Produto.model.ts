import { SubGrupo } from './SubGrupo.model';
import { CodBarra } from './CodBarra.model';
export class Produto {
    id?: number;
    descricao: string;
    referencia: string;
    precoCompra: number;
    precoVenda: number;
    dataValidade: Date;
    ativo: boolean;
    ncm: string;
    cest: string;
    codBarras?: CodBarra[];
    subGrupo: SubGrupo;

    constructor() {
        this.id = null,
            this.descricao = '',
            this.referencia = '',
            this.precoCompra = null,
            this.precoVenda = null,
            this.dataValidade = null,
            this.ativo = true,
            this.ncm = '',
            this.cest = '',
            this.codBarras = [],
            this.subGrupo = null
    }
}