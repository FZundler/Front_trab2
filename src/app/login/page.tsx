"use client"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useClienteStore } from "@/context/cliente"

type Inputs = {
  email: string
  senha: string
  manter: boolean
}

export default function Login() {
  const { register, handleSubmit } = useForm<Inputs>()
  const { logaCliente } = useClienteStore()
  const router = useRouter()

  async function verificaLogin(data: Inputs) {
    try {
      // Verifica a URL da API no console para garantir que está correta
      console.log("URL da API:", process.env.NEXT_PUBLIC_URL_API);

      const response = await fetch(`${process.env.NEXT_PUBLIC_URL_API}/clientes/login`, {
        headers: {
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({ email: data.email, senha: data.senha })
      })

      if (response.ok) {
        const dados = await response.json()
        console.log("Dados do cliente:", dados)

        // Armazena os dados do cliente no contexto
        logaCliente(dados)

        // Se 'manter' for verdadeiro, salva o id no localStorage
        if (data.manter) {
          localStorage.setItem("client_key", dados.id)
        } else {
          if (localStorage.getItem("client_key")) {
            localStorage.removeItem("client_key")
          }
        }

        // Redireciona para a página principal
        router.push("/")
      } else {
        alert("Erro... Login ou Senha incorretos")
      }
    } catch (error) {
      console.error("Erro ao realizar o login:", error)
      alert("Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.")
    }
  }

  return (
    <section className="dark:bg-transparent-">
      <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-20 sm:max-w-md xl:p-0 dark:bg-transparent dark:border-gray-100">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl ms-36 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              LOGIN
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(verificaLogin)}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">E-mail</label>
                <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 
                focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-100 dark:placeholder-gray-400 dark:text-dark
                 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="fulano@gmail.com" 
                  required 
                  {...register("email")} />
              </div>
              <div>
                <label htmlFor="senha" className="block mb-2 text-sm font-bold text-gray-900 dark:text-white">Senha</label>
                <input type="password" id="senha" placeholder="*******" className="bg-gray-50 border border-gray-300 text-gray-900 
                rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-600
                 dark:placeholder-gray-400 dark:text-dark dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                required 
                {...register("senha")} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded
                     bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" 
                    {...register("manter")} />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="remember" className=" dark:text-white font-bold">
                      Manter Conectado
                    </label>
                  </div>
                </div>
                <a href="#" className="text-sm font-bold text-white hover:underline white:text-white">Esqueceu sua senha?</a>
              </div>
              <button type="submit" className="w-full text-white bg-cyan-800 hover:bg-cyan-700 focus:ring-4 
              focus:outline-none focus:ring-primary-300 font-bold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 
              dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                Entrar</button>
              <p className="ms-8 font-bold dark:text-white">
                Você não está cadastrado? <a href="#" className="font-bold text-primary-600 hover:underline dark:text-primary-500">
                  Cadastre-se</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
