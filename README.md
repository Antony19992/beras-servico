# Projeto Beras Serviço

## Descrição
Este projeto é uma aplicação para gerenciamento de serviços e produtos, utilizando Node.js, Express e Sequelize para interagir com um banco de dados.

## Tecnologias Utilizadas
- Node.js
- Express
- Sequelize
- MySQL (ou outro banco de dados compatível)

## Instalação
1. Clone o repositório:
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd beras-servico
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```

## Como Rodar
1. Inicie o servidor:
   ```bash
   nodemon src/app.js
   ```
2. Acesse a API em `http://localhost:3000`

## Estrutura do Projeto
```
beras-servico/
├── src/
│   ├── app.js
│   ├── config/
│   ├── models/
│   ├── routes/
│   └── ...
├── package.json
└── README.md
```

## Documentação das Rotas

### Rotas de Usuários

1. **Criar Usuário**
   - **Método**: `POST`
   - **Endpoint**: `/users`
   - **Corpo da Requisição**: 
     - `nome`: string (obrigatório)
     - `email`: string (obrigatório)
     - `senha`: string (obrigatório)
   - **Resposta**:
     - **201 Created**: Retorna o usuário criado.
     - **400 Bad Request**: Retorna um erro se os dados fornecidos forem inválidos.

2. **Listar Todos os Usuários**
   - **Método**: `GET`
   - **Endpoint**: `/users`
   - **Resposta**:
     - **200 OK**: Retorna uma lista de usuários.
     - **500 Internal Server Error**: Retorna um erro se ocorrer um problema ao buscar os usuários.

3. **Buscar Usuário por ID**
   - **Método**: `GET`
   - **Endpoint**: `/users/:id`
   - **Parâmetros**:
     - `id`: ID do usuário (obrigatório)
   - **Resposta**:
     - **200 OK**: Retorna o usuário correspondente ao ID.
     - **404 Not Found**: Retorna um erro se o usuário não for encontrado.
     - **500 Internal Server Error**: Retorna um erro se ocorrer um problema ao buscar o usuário.

4. **Atualizar Usuário**
   - **Método**: `PUT`
   - **Endpoint**: `/users/:id`
   - **Parâmetros**:
     - `id`: ID do usuário (obrigatório)
   - **Corpo da Requisição**:
     - `nome`: string (opcional)
     - `email`: string (opcional)
     - `senha`: string (opcional)
   - **Resposta**:
     - **200 OK**: Retorna o usuário atualizado.
     - **404 Not Found**: Retorna um erro se o usuário não for encontrado.
     - **400 Bad Request**: Retorna um erro se os dados fornecidos forem inválidos.

5. **Deletar Usuário**
   - **Método**: `DELETE`
   - **Endpoint**: `/users/:id`
   - **Parâmetros**:
     - `id`: ID do usuário (obrigatório)
   - **Resposta**:
     - **204 No Content**: Indica que o usuário foi deletado com sucesso.
     - **404 Not Found**: Retorna um erro se o usuário não for encontrado.
     - **500 Internal Server Error**: Retorna um erro se ocorrer um problema ao deletar o usuário.

## Contribuição
Sinta-se à vontade para contribuir com melhorias e correções!

## Comando para rodar migrations
```bash
npx sequelize-cli db:migrate
```
