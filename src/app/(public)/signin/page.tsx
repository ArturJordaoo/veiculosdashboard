'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react'; // Importando a função do NextAuth
import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { z } from 'zod';

// Definindo o esquema de validação com Zod
const schema = z.object({
  email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
  senha: z
    .string()
    .min(6, 'Senha deve ter pelo menos 6 caracteres')
    .nonempty('Senha é obrigatória'),
});

// Definindo os tipos para os dados do formulário
type FormData = {
  email: string;
  senha: string;
};

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await signIn('credentials', {
        redirect: false, // Não redirecionar automaticamente
        email: data.email,
        password: data.senha,
      });

      if (res?.error) {
        toast.error('Erro ao fazer login: ' + res.error);
      } else {
        toast.success('Login bem-sucedido!');
        // Aqui você pode redirecionar para uma página protegida ou inicial
        window.location.href = '/'; // Exemplo de redirecionamento após login
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      toast.error('Erro ao fazer login');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen p-4 sm:p-8">
      <Toaster />
      <div className="flex flex-col sm:flex-row max-w-4xl max-h-[40rem] w-full rounded-3xl bg-[#f7f7f7] shadow-lg">
        {/* Formulário de Login */}
        <div className="w-full sm:w-1/2 pt-12 px-6 sm:px-12 flex flex-col justify-center">
          <header className="flex justify-center mb-4">
            <Image
              src="/images/logo.svg"
              alt="logo"
              width={157}
              height={44}
              className="relative grid justify-center items-center"
            />
          </header>
          <p className="flex text-sm text-[#636364] mt-2 pt-[8px] pb-[40px] text-center sm:text-left justify-center">
            Bem-vindo de volta! Insira seus dados
          </p>
          <div className="mb-8">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="text-sm block font-medium text-[#181818]"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  className="text-sm w-full mt-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </div>

              <div className="mb-5">
                <div className="flex justify-between items-center">
                  <label
                    htmlFor="senha"
                    className="text-sm block font-medium text-[#181818]"
                  >
                    Password
                  </label>
                </div>
                <input
                  id="senha"
                  type="password"
                  placeholder="Digite sua senha"
                  className="text-sm w-full mt-1 p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  {...register('senha')}
                />
                {errors.senha && (
                  <p className="text-red-500 text-sm">{errors.senha.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="py-2 w-full rounded-xl bg-blue-600 text-white text-lg hover:bg-blue-700 focus:outline-none"
              >
                Entrar
              </button>
            </form>
            <div
              id="footer"
              className="text-[10px] flex justify-center items-center pt-[50px]"
            >
              Não tem uma conta?
              <a href="/signup" className="text-blue-700">
                Cadastre-se gratuitamente!
              </a>
            </div>
          </div>
        </div>

        {/* Imagem Lateral (somente em telas grandes) */}
        <div className="hidden sm:block w-full sm:w-1/2 h-full">
          <img
            src="/images/login.svg"
            alt="login illustration"
            className="w-full h-full object-contain rounded-tr-3xl rounded-br-3xl"
          />
        </div>
      </div>
    </div>
  );
}
