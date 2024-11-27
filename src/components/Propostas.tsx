// pages/minhas-propostas.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useClienteStore } from "@/context/cliente"; // Importa o contexto do cliente

const MinhasPropostas = () => {
  const [propostas, setPropostas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { cliente } = useClienteStore(); // Obtém o cliente logado

  useEffect(() => {
    const fetchPropostas = async () => {
      if (!cliente) {
        console.error("Cliente não está logado.");
        setLoading(false);
        return; // Se o cliente não estiver logado, não faz a requisição
      }

      try {
       const response = await axios.get(`http://localhost:3004/propostas/${cliente.id}`);
        setPropostas(response.data);
      } catch (error) {
        console.error("Erro ao buscar propostas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPropostas();
  }, [cliente]); // Dependência no cliente

  if (loading) {
    return <div>Carregando propostas...</div>;
  }

  return (
    <div>
      <h2>Minhas Propostas</h2>
      <ul>
        {propostas.map((proposta) => (
          <li key={proposta.id}>
            <p>Produto: {proposta.produto.modelo}</p>
            <p>Descrição: {proposta.descricao}</p>
            <p>Resposta: {proposta.resposta || "Nenhuma resposta ainda"}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MinhasPropostas;
