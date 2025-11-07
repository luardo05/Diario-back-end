API - Diário Pessoal

Este repositório contém o código-fonte do back-end para um serviço de diário pessoal. A API foi construída com Node.js e Express, utilizando MongoDB como banco de dados para persistir os dados.

✨ Funcionalidades

Autenticação de Usuários: Sistema completo de registro e login com JSON Web Token (JWT) para segurança.

Gerenciamento de Eventos: Operações CRUD (Criar, Ler, Atualizar, Deletar) para os eventos do diário.

Upload de Imagens: Permite que o usuário adicione uma foto como parte principal de cada evento.

Segurança: As rotas de eventos são protegidas, garantindo que um usuário só possa acessar e gerenciar seus próprios registros.

💻 Tecnologias Utilizadas

Node.js

Express

MongoDB (com Mongoose)

JSON Web Token (JWT) para autenticação

Bcrypt.js para hash de senhas

Multer para upload de arquivos

Dotenv para gerenciamento de variáveis de ambiente

🚀 Como Executar o Projeto

Siga os passos abaixo para rodar a aplicação localmente.

1. Clone o repositório

code
Bash
download
content_copy
expand_less
git clone https://github.com/seu-usuario/nome-do-repositorio.git```

**2. Navegue até a pasta do projeto**
```bash
cd nome-do-repositorio

3. Instale as dependências

code
Bash
download
content_copy
expand_less
npm install

4. Configure as Variáveis de Ambiente

Crie um arquivo chamado .env na raiz do projeto e adicione as seguintes variáveis. Use o exemplo abaixo como base.

code
Env
download
content_copy
expand_less
# Porta em que o servidor irá rodar
PORT=3001

# String de conexão com o seu banco de dados MongoDB (local ou Atlas)
MONGO_URI=mongodb://localhost:27017/diario-pessoal

# Chave secreta para gerar os tokens JWT (use uma string longa e aleatória)
JWT_SECRET=sua_chave_secreta_super_segura

5. Execute o servidor

code
Bash
download
content_copy
expand_less
npm run dev

O servidor estará disponível no endereço http://localhost:3001.

Endpoints da API
Autenticação (/api/auth)

POST /register

Registra um novo usuário.

Corpo da requisição (JSON): { "name": "Seu Nome", "email": "email@teste.com", "password": "sua_senha" }

POST /login

Autentica um usuário e retorna um token JWT.

Corpo da requisição (JSON): { "email": "email@teste.com", "password": "sua_senha" }

Eventos (/api/events)

🔒 Rotas protegidas. Requerem um Bearer Token no cabeçalho Authorization.

GET /

Lista todos os eventos do usuário autenticado.

POST /

Cria um novo evento para o usuário autenticado.

Corpo da requisição: form-data contendo os campos title, date, description, e o arquivo photo.

PUT /:id

Atualiza um evento existente pelo seu ID.

Corpo da requisição (JSON): { "title": "Novo Título", "description": "Nova Descrição" }

DELETE /:id

Deleta um evento pelo seu ID.
