export class UnidadeMedida {
    id?: number;
    unidade: string;
    descricao: string;
    fator: number;

    constructor() {
        this.id = null,
            this.unidade = '',
            this.descricao = '',
            this.fator = 1
    }
}