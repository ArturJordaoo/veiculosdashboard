
# **VeiculosDashboard**

Seja bem-vindo ao **VeiculosDashboard**, uma aplicação super legal para gerenciar veículos! 🏎️💨 Esse projeto usa **Next.js** para o frontend, **Prisma** para interagir com o banco de dados e várias outras ferramentas que tornam o desenvolvimento mais tranquilo.

## **Tecnologias Usadas**

- **Next.js**: Framework React, super potente para criar apps com SSR (renderização no servidor).
- **Prisma**: ORM (Object Relational Mapper) que facilita o trabalho com o banco de dados.
- **TypeScript**: Para ter tudo tipado e evitar surpresas.
- **NextAuth.js**: Para gerenciar login, sessão e autenticação.
- **Tailwind CSS**: Porque a gente ama um design limpo e responsivo sem perder tempo com CSS.

## **Antes de Começar**

Aqui estão algumas coisinhas que você precisa ter no seu computador para rodar esse projeto:

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**
- **Prisma** (isso vai ser instalado junto com as dependências do projeto)

## **Instalação: Vamos nessa!**

1. **Clone o repositório**:

   Primeiro, pegue o código do projeto:

   ```bash
   git clone https://seu-repositorio.git
   cd veiculosdashboard
   ```

2. **Instale as dependências**:

   Use o **npm** ou **yarn**, dependendo da sua preferência:

   Com **npm**:

   ```bash
   npm install
   ```

   Ou com **yarn**:

   ```bash
   yarn install
   ```

3. **Configuração do Banco de Dados**:

   O projeto usa um banco de dados, então você precisa configurar as credenciais. Crie o arquivo `.env` a partir do `.env.example` e preencha com as suas credenciais:

   Exemplo de configuração no `.env`:

   ```env
   DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/nome_do_banco"
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=um-segredo-aqui
   ```

4. **Gere o banco de dados com o Prisma**:

   Agora, é hora de criar as tabelas no banco de dados com o Prisma:

   ```bash
   npx prisma migrate dev
   ```

5. **Rodando o Projeto**:

   Agora é só rodar o servidor e acessar o projeto! Use o comando abaixo para rodar em modo de desenvolvimento:

   Com **npm**:

   ```bash
   npm run dev
   ```

   Ou com **yarn**:

   ```bash
   yarn dev
   ```

   A aplicação estará disponível em `http://localhost:3000` no seu navegador. 🎉

## **Estrutura do Projeto**

- **`src/`**: Contém a maior parte do código do projeto.
  - **`app/`**: Onde ficam as páginas e o layout.
  - **`components/`**: Aqui ficam os componentes reutilizáveis (botões, tabelas, etc).
  - **`lib/`**: Funções auxiliares e utilitários.
  - **`pages/`**: As rotas de API e algumas páginas principais.
  - **`schema/`**: Arquivos relacionados ao modelo de banco de dados no Prisma.

- **`prisma/`**: Aqui ficam os arquivos de configuração do Prisma e as migrações do banco de dados.

- **`.env`**: Arquivo para configurar as variáveis de ambiente (como credenciais de banco de dados e segredo do NextAuth).

## **Rotas da API**

### **/api/vehicles**
- **Método**: `GET`
- **Descrição**: Retorna todos os veículos cadastrados no banco.

### **/api/vehicles/[id]**
- **Método**: `GET`
- **Descrição**: Retorna os detalhes de um veículo com o `id` especificado.

### **/api/auth/[...nextauth]**
- **Método**: `POST`, `GET`
- **Descrição**: Rota para autenticação de usuários com NextAuth.

### **/api/signup**
- **Método**: `POST`
- **Descrição**: Para criar um novo usuário.

## **Autenticação**

A aplicação usa **NextAuth.js** para gerenciar o login e a sessão dos usuários. A configuração do NextAuth está em `/src/api/auth/[...nextauth].ts`. Por padrão, o login pode ser feito com credenciais, mas você também pode adicionar outros provedores, como Google ou GitHub.

### **Provedores de Autenticação**
Se quiser adicionar ou configurar provedores, edite o arquivo `/src/api/auth/[...nextauth].ts`.

## **Comandos Úteis**

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Prepara a versão de produção.
- `npm run start`: Roda a versão de produção.
- `npm run lint`: Verifica o código para erros de linting.

## **Contribuindo**

Quer contribuir? Que massa! Aqui vai um guia rápido:

1. **Faça um fork** do repositório.
2. **Clone** o repositório forkado.
3. Crie uma **branch nova** para suas mudanças:
   ```bash
   git checkout -b minha-nova-funcionalidade
   ```
4. Faça as alterações e submeta um **pull request** com uma descrição das suas mudanças.

## **Notas Finais**

Esse projeto foi feito para ser simples, rápido e funcional. Se você encontrar algum problema ou tiver ideias para melhorias, não hesite em abrir uma issue ou contribuir!

Boa sorte e divirta-se com o VeiculosDashboard! 🚗💨
