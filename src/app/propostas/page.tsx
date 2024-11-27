'use client'
import './page.css'
import { useEffect, useState } from "react";
import { useClienteStore } from "@/context/cliente";
import { PropostaI } from "@/utils/types/propostas";

export default function Propostas() {
  const [propostas, setPropostas] = useState<PropostaI[]>([])
  const { cliente } = useClienteStore()

  useEffect(() => {
    async function buscaDados() {
      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/propostas/${cliente.id}`)
      const dados = await response.json()
      setPropostas(dados)
    }
    buscaDados()
  }, [cliente.id]) // Corrige o aviso de dependência faltante

  // Função para formatar a data no formato DD/MM/YYYY
  function dataDMA(data: string) {
    const ano = data.substring(0, 4)
    const mes = data.substring(5, 7)
    const dia = data.substring(8, 10)
    return dia + "/" + mes + "/" + ano
  }

  const propostasTable = propostas.map((proposta, index) => ( // Adicionado 'index' como fallback
    <tr
      key={proposta.id || index} // Utiliza 'proposta.id' se disponível, senão usa o índice
      className="bg-white border-b dark:bg-gray-500/35 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm"
    >
      <th scope="row" className="px-4 py-2 font-medium text-gray-900 whitespace-nowrap dark:text-white rounded-l-lg">
        {proposta.produto.modelo}
      </th>
      <td className="px-4 py-2 rounded-lg">
        <img src={proposta.produto.foto} className="fotoproduto rounded-lg" alt="Foto produto" />
      </td>
      <td className="px-4 py-2 rounded-lg">
        <p><b>{proposta.descricao}</b></p>
        <p><i>Enviado em: {dataDMA(proposta.createdAt)}</i></p>
      </td>
      <td className="px-4 py-2 rounded-lg">
        {proposta.resposta ? (
          <>
            <p><b>{proposta.resposta}</b></p>
            <p><i>Respondido em: {dataDMA(proposta.updatedAt as string)}</i></p>
          </>
        ) : (
          <i>Aguardando...</i>
        )}
      </td>
    </tr>
  ));
  
  return (
    <section className="max-w-7xl mx-auto">
      <h1 className="mb-6 mt-4 text-3xl font-extrabold leading-none tracking-tight text-gray-100 md:text-4xl lg:text-5xl dark:text-white">
        Listagem de Minhas Propostas
      </h1>
  
      <table className="w-full text-sm text-left rtl:text-right text-gray-100 dark:text-gray-100">
        <thead className="text-xs text-gray-100 uppercase bg-gray-50 dark:bg-transparent dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 text-white">
              Modelo do Instrumento
            </th>
            <th scope="col" className="px-6 py-3 text-white">
              Foto
            </th>
            <th scope="col" className="px-6 py-3 text-white">
              Proposta
            </th>
            <th scope="col" className="px-6 py-3 text-white">
              Resposta
            </th>
          </tr>
        </thead>
        <tbody>
          {propostasTable}
        </tbody>
      </table>
    </section>
  )
}
