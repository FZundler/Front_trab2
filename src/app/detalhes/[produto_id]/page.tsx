"use client";
import { ProdutoI } from "@/utils/types/produto";
import { FotoI } from "@/utils/types/fotos";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useClienteStore } from "@/context/cliente";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Inputs = {
  descricao: string;
};

export default function Detalhes() {
  const params = useParams();
  const { cliente } = useClienteStore();

  const [produto, setProduto] = useState<ProdutoI | undefined>(undefined);
  const [fotos, setFotos] = useState<FotoI[]>([]);

  const { register, handleSubmit, reset } = useForm<Inputs>();

  useEffect(() => {
    async function buscaDados() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_API}/produtos/${params.produto_id}`
        );
        if (!response.ok) throw new Error("Erro ao buscar produto");
        const dados: ProdutoI = await response.json();
        setProduto(dados);
      } catch (error) {
        toast.error("Erro ao carregar dados do produto");
        console.error(error);
      }
    }

    async function buscaFotos() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL_API}/fotos/${params.produto_id}`
        );
        if (!response.ok) throw new Error("Erro ao buscar fotos");
        const dados: FotoI[] = await response.json();
        setFotos(dados);
      } catch (error) {
        toast.error("Erro ao carregar fotos");
        console.error(error);
      }
    }

    buscaDados();
    buscaFotos();
  }, [params.produto_id]);

  const listaFotos = fotos.map((foto) => (
    <div key={foto.id}>
      <img
        className="h-auto max-w-80 rounded-lg"
        src={`data:image/jpg;base64,${foto.codigoFoto}`}
        alt={foto.descricao}
        title={foto.descricao}
      />
    </div>
  ));

  async function enviaProposta(data: Inputs) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL_API}/propostas`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          clienteId: cliente.id,
          produtoId: Number(params.produto_id),
          descricao: data.descricao,
        }),
      }
    );

    if (response.status === 201) {
      toast.success("Obrigado. Sua proposta foi enviada. Aguarde retorno");
      reset();
    } else {
      toast.error("Erro... Não foi possível enviar sua proposta");
    }
  }

  return (
    <>
      <section className="flex mt-6 mx-auto flex-col items-center
       bg-white border
       border-gray-200 rounded-lg shadow md:flex-row md:max-w-5xl
         dark:border-gray-100 dark:bg-transparent">
        <img
          className="object-cover w-full rounded-t-lg h-96 md:h-2/4 md:w-2/4 md:rounded-none md:rounded-s-lg"
          src={produto?.foto}
          alt="Foto do produto"
        />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-serif tracking-tight text-gray-900 dark:text-white">
            {produto?.marca.nome} {produto?.modelo}
          </h5>
          <h5 className="mb-2 text-xl tracking-tight text-gray-900 dark:text-white">
            Ano: {produto?.ano || "Ano não disponível"}
          </h5>
          <h5 className="mb-2 text-xl font-extrabold tracking-tight text-gray-900 dark:text-red-200">
            Preço R$:{" "}
            {produto?.preco
              ? Number(produto.preco).toLocaleString("pt-br", {
                  minimumFractionDigits: 2,
                })
              : "Preço não disponível"}
          </h5>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {produto?.acessorios}
          </p>

          {cliente.id ? (
            <>
              <h3 className="text-xl font-bold tracking-tight
               text-gray-900 dark:text-white">
                Gostou deste produto? Faça uma Proposta!
              </h3>
              <form onSubmit={handleSubmit(enviaProposta)}>
                <label
                  htmlFor="clienteInfo"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Informações do Cliente:
                </label>
                <input
                  id="clienteInfo"
                  type="text"
                  className="mb-2 mt-4 bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
                   focus:border-blue-500 block w-full p-2.5 cursor-not-allowed dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400
                   dark:text-gray-400 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={`${cliente?.nome || ""} (${cliente?.email || ""})`} // Usando optional chaining
                  disabled
                  title="Informações do cliente"
                />
                <label
                  htmlFor="descricao"
                  className="block text-sm font-medium text-gray-700 dark:text-white"
                >
                  Descrição da Proposta:
                </label>
                <textarea
                  id="descricao"
                  className="mb-2 block p-2.5 w-full  text-sm bg-gray-50 rounded-lg border
                   border-gray-300 focus:ring-blue-500
                   focus:border-blue-500 dark:bg-gray-200 dark:border-gray-600 dark:placeholder-gray-400 dark:text dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Descreva a sua proposta"
                  required
                  {...register("descricao")}
                  title="Descreva a sua proposta"
                ></textarea>
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center
                   dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
                >
                  Enviar Proposta
                </button>
              </form>
            </>
          ) : (
            <h3 className="text-xl font-bold tracking-tight text-orange-700 dark:text-white">
              ** Faça login para fazer proposta para este produto
            </h3>
          )}
        </div>
      </section>

      <div className="mt-4 md:max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
        {listaFotos}
      </div>
    </>
  );
}
