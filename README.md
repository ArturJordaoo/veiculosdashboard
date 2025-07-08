
# **VeiculosDashboard**

Esse projeto usa **Next.js** para o frontend, **Prisma** para interagir com o banco de dados e várias outras ferramentas que tornam o desenvolvimento mais tranquilo.

## **Tecnologias Usadas**

- **Next.js**: 
- **Prisma**:
- **TypeScript**: 
- **NextAuth.js**: .
- **Tailwind CSS**:

## **Necessário**


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
   npm i
   ```

   Ou com **yarn**:

   ```bash
   yarn
   ```

3. **Configuração do Banco de Dados**:

   Crie o arquivo `.env` a partir do `.env.example` e preencha com as suas credenciais:

   Exemplo de configuração no `.env`:

   ```env
   DATABASE_URL="mysql://USER:PASSWORD@localhost:3306/nome_do_banco"
   ```

4. **Gere o banco de dados com o Prisma**:

   Para criar as tabelas no banco de dados com o Prisma:

   ```bash
   npx prisma migrate dev
   ```

5. **Rodando o Projeto**:

   Use o comando abaixo para rodar em modo de desenvolvimento:

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



