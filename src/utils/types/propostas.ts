import { ProdutoI } from "./produto";

export interface PropostaI {
  id: number;
  clienteId: string;
  produtoId: number;
  produto: ProdutoI;
  descricao: string;
  resposta: string | null;
  createdAt: string;
  updatedAt: string | null;
}
