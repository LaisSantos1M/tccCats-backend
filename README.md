# Backend TCC Cats 🐱

Backend para gerenciamento de gatos desenvolvido como Trabalho de Conclusão de Curso (TCC) pelos autores Maria e Lais.

## 📋 Sobre o Projeto

Este é um sistema que permite que pessoas usuárias cadastrem e gerenciem informações sobre gatos, incluindo dados pessoais dos proprietários e detalhes dos felinos sob sua responsabilidade.

## 🛠️ Stack Tecnológico

- **Runtime**: Node.js
- **Framework Web**: Express.js v5.2.1
- **Linguagem**: TypeScript
- **ORM**: Prisma v7.8.0
- **Banco de Dados**: SQLite (via better-sqlite3)
- **Autenticação**: JWT (JSON Web Token)
- **Criptografia**: Bcrypt para senhas
- **Upload de Arquivos**: Multer
- **Documentação API**: Swagger (swagger-jsdoc + swagger-ui-express)
- **CORS**: Habilitado para requisições cross-origin

## 📊 Modelo de Dados

### Pessoa (Usuário)
- **ID** (chave primária)
- **Nome** - Nome completo do usuário
- **Email** (único) - Email para login
- **Senha** - Criptografada com Bcrypt
- **Relação 1-para-N** com Gatos

### Gatos
- **ID** (chave primária)
- **Nome** - Nome do gato
- **Vacina** - Situação vacinal (número)
- **Cor/Raça** - Descrição física/raça
- **Data de Nascimento** - Data do nascimento
- **Número de Telefone** - Contato do proprietário
- **Foto** (opcional) - Imagem do gato
- **Relação** com Pessoas

## 🔌 Endpoints da API

### Autenticação e Pessoas

#### Login
```
POST /pessoas/login
```
Realiza autenticação e retorna JWT.

#### Obter Pessoa Específica
```
GET /pessoas/:id
```
Obtém detalhes de uma pessoa específica. **Protegido por autenticação.**

#### Criar Pessoa
```
POST /pessoas/create
```
Cria uma nova conta de usuário.

### Gatos

#### Listar Gatos
```
GET /gatos
```
Lista todos os gatos cadastrados. **Protegido por autenticação.**

#### Obter Gato Específico
```
GET /gatos/:id
```
Obtém detalhes de um gato específico. **Protegido por autenticação.**

#### Criar Gato
```
POST /gatos
```
Cria um novo cadastro de gato com upload de foto.

#### Atualizar Gato
```
PUT /gatos/:id
```
Atualiza informações de um gato com possibilidade de nova foto. **Protegido por autenticação.**

#### Deletar Gato
```
DELETE /gatos/:id
```
Remove um gato do sistema. **Protegido por autenticação.**

## 🔐 Segurança

- **Autenticação via JWT** - Tokens para validar sessões
- **Senhas Criptografadas** - Utilizando Bcrypt
- **Middleware de Autenticação** - Proteção em endpoints sensíveis
- **CORS Configurado** - Controle de acesso cross-origin
- **Validação de Email** - Campo único para evitar duplicatas

## 📂 Estrutura do Projeto

```
.
├── src/
│   ├── app.ts                 # Configuração do Express
│   ├── index.ts               # Entrada da aplicação
│   ├── routes.ts              # Definição de rotas
│   ├── controllers/
│   │   ├── cats.ts            # Lógica de gatos
│   │   └── people.ts          # Lógica de pessoas
│   └── middlewares/
│       └── authentication.ts   # Middleware JWT
│
├── prisma/
│   ├── schema.prisma          # Definição do banco de dados
│   └── migrations/            # Histórico de migrações
│
├── config/
│   ├── prisma.ts              # Configuração Prisma
│   ├── swagger.config.ts       # Configuração Swagger
│   └── prismaErrorCodes.json   # Mapeamento de erros
│
├── generated/
│   └── prisma/                # Código gerado pelo Prisma
│
├── helpers/
│   └── prismaErrorCodes.ts    # Utilitários de erro
│
├── uploads/                   # Armazenamento de fotos
├── package.json
├── prisma.config.ts
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos
- Node.js instalado
- npm ou yarn

### Instalação de Dependências
```bash
npm install
```

### Executar em Desenvolvimento
```bash
npm run dev
```
O servidor iniciará com hot-reload automático via tsx.

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com as configurações necessárias.

## 📝 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Executa o servidor em modo desenvolvimento com hot-reload |
| `npm test` | Executa testes (não configurado) |

## 🔧 Tecnologias Adicionais

- **tsx** - Executor TypeScript com suporte a ES modules
- **Swagger UI** - Documentação interativa da API
- **Prisma CLI** - Gerenciamento de banco de dados e migrações

## 👥 Autores

- Maria
- Lais

## 📄 Licença

ISC

## 📞 Contato

Para dúvidas sobre o projeto, entre em contato com os autores.

---

**Última atualização**: Agosto de 2026
