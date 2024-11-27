"use client";
import { useState } from "react";
import { useClienteStore } from "@/context/cliente"; // Caminho corrigido
import Link from "next/link";

const ClienteDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { cliente, deslogaCliente } = useClienteStore();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    deslogaCliente(); // Chama a função para deslogar
  };

  return (
    <div className="relative">
      <span 
        className="text-white cursor-pointer" 
        onClick={toggleDropdown}
      >
        {cliente.nome || "Cliente"} {/* Mostra o nome do cliente ou "Cliente" se não estiver logado */}
      </span>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-44 bg-white rounded-lg shadow-lg z-10">
          <ul className="py-2 text-sm text-gray-700">
            <li>
              <Link href="/propostas" className="block px-4 py-2 hover:bg-gray-100">Minhas Propostas</Link>
            </li>
            <li>
              <Link href="/interacoes" className="block px-4 py-2 hover:bg-gray-100">Minhas Interações</Link>
            </li>
            <li>
              <Link href="/configuracoes" className="block px-4 py-2 hover:bg-gray-100">Configurações</Link>
            </li>
            <li>
              <span 
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer" 
                onClick={handleLogout} // Chama a função de logout
              >
                Sair
              </span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ClienteDropdown;
