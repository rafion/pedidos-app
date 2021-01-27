import { Departamento } from './Departamento.model';
import { number } from "ng-brazil/number/validator";

export class Secao {
    id: number;
    nome: string;
    departamento: Departamento;
}