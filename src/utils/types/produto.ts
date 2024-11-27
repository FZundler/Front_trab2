export interface ProdutoI {
  id: number;
  modelo: string;
  ano: number;
  preco: number;
  destaque: boolean;
  foto: string;
  acessorios: string;
  createdAt: Date;
  updatedAt: Date;
  marca: {
  nome: string; // Adicione esta linha
  }; 
  marcaId: number;
}
