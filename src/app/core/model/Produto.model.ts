import { Grupo } from './Grupo.model';
import { Marca } from './Marca.model';
import { SubGrupo } from './SubGrupo.model';
import { CodBarra } from './CodBarra.model';
import { UnidadeMedida } from './UnidadeMedida.model';
export class Produto {
    id?: number;
    nome: string;
    referencia: string;
    precoCompra: number;
    precoVenda: number;
    dataValidade: Date;
    ativo: boolean;
    ncm: string;
    cest: string;
    codBarras?: CodBarra[];
    grupo: Grupo;
    subGrupo: SubGrupo;
    marca: Marca;
    unidadeMedida: UnidadeMedida;

    constructor() {
        this.id = null,
            this.nome = '',
            this.referencia = '',
            this.precoCompra = null,
            this.precoVenda = null,
            this.dataValidade = null,
            this.ativo = true,
            this.ncm = '',
            this.cest = '',
            this.codBarras = [],
            this.grupo = null,
            this.subGrupo = null,
            this.marca = null
    }
}