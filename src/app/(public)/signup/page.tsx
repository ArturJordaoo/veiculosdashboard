'use client';
import {
  faEye,
  faEyeSlash,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { z } from 'zod';

// Definindo o esquema de validação com Zod para o Signup
const schema = z
  .object({
    nome: z.string().nonempty('Nome é obrigatório'),
    email: z.string().email('Email inválido').nonempty('Email é obrigatório'),
    senha: z
      .string()
      .min(6, 'Senha deve ter pelo menos 6 caracteres')
      .nonempty('Senha é obrigatória'),
    confirmarSenha: z
      .string()
      .min(6, 'Senha de confirmação deve ter pelo menos 6 caracteres')
      .nonempty('Confirmação de senha é obrigatória'),
  })
  .refine(
    (data) => {
      return data.senha === data.confirmarSenha;
    },
    {
      message: 'Senhas devem coincidir',
      path: ['confirmarSenha'],
    },
  );

type FormData = {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
};

export default function SignUp() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  if (session) {
    return null; // Ou um componente de carregamento
  }
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        // Pega a resposta de erro da API
        const result = await res.json();
        console.error('Erro no cadastro:', result.error);

        // Exibe a mensagem de erro no toast
        toast.error(result.error || 'Erro no cadastro');
        return;
      }

      const result = await res.json();
      console.log('Cadastro bem-sucedido!', result);
      toast.success('Cadastro bem-sucedido!');
      window.location.href = '/signin';
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      toast.error('Erro inesperado, por favor tente novamente');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen p-4 sm:p-8 bg-[##ffffff]">
      <Toaster />
      <div className="max-w-md w-full p-8 rounded-3xl bg-[#f7f7f7] shadow-lg">
        <header className="flex justify-center mb-4">
          <Image
            src="/images/logo.svg"
            alt="logo"
            width={157}
            height={44}
            className="relative grid justify-center items-center"
          />
        </header>
        <p className="flex text-sm text-[#636364] mt-2 pt-[8px] pb-[20px] text-center sm:text-left justify-center">
          Crie sua conta. Insira seus dados
        </p>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-6">
              <label
                htmlFor="nome"
                className="block text-sm font-semibold text-[#4A4A4A]"
              >
                Nome
              </label>
              <input
                id="nome"
                type="text"
                placeholder="Digite seu nome"
                className=" w-full mt-1 p-2 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] text-sm"
                {...register('nome')}
              />
              {errors.nome && (
                <p className="text-red-500 text-sm">{errors.nome.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-[#4A4A4A]"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full mt-1 p-2 border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] text-sm"
                {...register('email')}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="senha"
                className="block text-sm font-semibold text-[#4A4A4A]"
              >
                Senha
              </label>
              <div className="relative">
                <input
                  id="senha"
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder="Digite sua senha"
                  className="text-sm w-full mt-1 p-2 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] border border-[#E5E7EB] rounded-xl"
                  {...register('senha')}
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center cursor-pointer"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <FontAwesomeIcon
                    icon={isPasswordVisible ? faEye : faEyeSlash}
                    className="text-[#4A4A4A]"
                  />
                </button>
              </div>

              {errors.senha && (
                <p className="text-red-500 text-sm">{errors.senha.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmarSenha"
                className="block text-sm font-semibold text-[#4A4A4A]"
              >
                Confirmar Senha
              </label>

              <div className="relative">
                <input
                  id="confirmarSenha"
                  type={isPasswordVisible ? 'text' : 'password'}
                  placeholder="Confirme sua senha"
                  className="text-sm w-full mt-1 p-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8] border border-[#E5E7EB] rounded-xl"
                  {...register('confirmarSenha')}
                />
                <button
                  type="button"
                  className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center cursor-pointer"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                >
                  <FontAwesomeIcon
                    icon={isPasswordVisible ? faEye : faEyeSlash}
                    className="text-[#4A4A4A]"
                  />
                </button>
              </div>

              {errors.confirmarSenha && (
                <p className="text-red-500 text-sm">
                  {errors.confirmarSenha.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="py-3 w-full rounded-xl bg-[#1D4ED8] text-white text-lg hover:bg-[#2563EB] focus:outline-none cursor-pointer"
            >
              {isSubmitting ? (
                <FontAwesomeIcon
                  icon={faSpinner}
                  className="text-white animate-spin"
                />
              ) : (
                'Criar Conta'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
