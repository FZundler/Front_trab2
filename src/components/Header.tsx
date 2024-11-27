"use client";
import Link from "next/link";
import { useClienteStore } from "@/context/cliente";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

export function Header() {
  const { cliente, deslogaCliente } = useClienteStore();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null); // Referência para o dropdown

  function sairCliente() {
    deslogaCliente();
    // remove de localStorage o id do cliente logado (se ele indicou salvar no login)
    if (localStorage.getItem("client_key")) {
      localStorage.removeItem("client_key");
    }
    router.push("/login");
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Função para fechar o dropdown ao clicar fora
  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    // Adiciona o listener ao clicar fora
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Remove o listener quando o componente é desmontado
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-transparent"> 
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="./guitar.png" className="h-16" alt="Loja de Instrumentos" />
          <span className="self-center text-3xl font-serif whitespace-nowrap dark:text-red-500">
            Music Store
          </span>
        </Link>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          {cliente.id ? (
            <>
              <div className="relative" ref={dropdownRef}> {/* Referência aqui */}
                <span 
                  className="text-white cursor-pointer" // Adicionando cursor pointer para indicar que é clicável
                  onClick={toggleDropdown} // Fazendo o nome abrir o dropdown
                >
                  {cliente.nome}
                </span>
                {isDropdownOpen && (
                  <div className="absolute left-0 mt-1 w-44 bg-white rounded-lg shadow-lg z-10">
                    <ul className="py-2 text-sm text-gray-700" aria-labelledby="dropdownDefaultButton">
                      <li>
                        <Link href="/propostas" className="block px-4 py-2 hover:bg-gray-100">Minhas Propostas</Link>
                      </li>
                       <li>
                        <span 
                          className="block px-4 py-2 hover:bg-gray-100 cursor-pointer" 
                          onClick={sairCliente}
                        >
                          Sair
                        </span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link href="/login" className="font-black text-red-800 dark:text-gray-100 hover:underline">
              Entrar
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
