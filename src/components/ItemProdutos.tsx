import { ProdutoI } from "@/utils/types/produto";
import Link from "next/link";

export function ItemProdutos({ data }: { data: ProdutoI }) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg dark:bg-transparent dark:backdrop-blur-md dark:border-white">
      <Link href={`/detalhes/${data.id}`}>
        <img
          className="rounded-t-lg"
          src={data.foto}
          alt={`Imagem do ${data.modelo}`}
        />
      </Link>

      <div className="p-5">
        <h5 className="mb-2 text-2xl font-serif tracking-tight text-gray-900 dark:text-white">
          {data.modelo}
        </h5>

        <p className="mb-3 text-rose-200 font-extrabold">
          R${" "}
          {Number(data.preco).toLocaleString("pt-br", {
            minimumFractionDigits: 2,
          })}
        </p>
        <p className="mb-3 text-sm text-gray-700 dark:text-gray-400 truncate">
          {data.acessorios}
        </p>
        <Link
          href={`/detalhes/${data.id}`}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center
      text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-blue-800"
        >
          Ver Detalhes
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}
