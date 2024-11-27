'use client';
import { InputPesquisa } from "@/components/InputPesquisa";
import { ItemProdutos } from "@/components/ItemProdutos";
import { ProdutoI } from "@/utils/types/produto";
import { useEffect, useState } from "react";
import { Toaster } from 'sonner';
import { useClienteStore } from "@/context/cliente";

export default function Home() {
  const [produtos, setProdutos] = useState<ProdutoI[]>([]);
  const { logaCliente } = useClienteStore();

  useEffect(() => {
    async function buscaCliente(idCliente: string) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/${idCliente}`);
      if (response.status === 200) {
        const dados = await response.json();
        logaCliente(dados);
      }
    }

    if (localStorage.getItem("client_key")) {
      const idClienteLocal = localStorage.getItem("client_key") as string;
      buscaCliente(idClienteLocal);
    }

    async function buscaDados() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/Produtos`);
        if (!response.ok) {
          throw new Error(`Erro: ${response.status}`);
        }
        const dados = await response.json();
        if (Array.isArray(dados)) {
          setProdutos(dados);
        } else {
          console.error("A resposta da API não é um array:", dados);
          setProdutos([]);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setProdutos([]);
      }
    }

    buscaDados();
  }, []);

  const listaProdutos = produtos.map(produto => (
    <ItemProdutos data={produto} key={produto.id} />
  ));

  return (
    <main>
      <InputPesquisa setProdutos={setProdutos} />
      <section className="max-w-screen-xl mx-auto">
        <h1 className="mb-5 mt-5 text-3xl font-serif leading-none tracking-tight ms-72 
        text-white md:text-4xl lg:text-5xl dark:text-dark">Instrumentos<span className="ms-3">em destaque</span></h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {listaProdutos}
        </div>
      </section>
      <Toaster position="top-right" richColors />
    </main>
  );
}
