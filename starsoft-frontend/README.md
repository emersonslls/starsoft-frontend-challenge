
 # Starsoft Front-End Challenge
 
 Este repositório contém a solução para o desafio de Front-End da Starsoft, implementado utilizando **Next.js**, **React**, **Redux**, **React Query** e **SASS**.
 
 ## 🚀 Instruções de Inicialização
 
 ### 1. Clonando o Repositório
 
 Primeiramente, clone o repositório para o seu ambiente local:
 
 ```bash
 git clone https://github.com/emersonslls/starsoft-frontend-challenge.git
 ```
 
 ### 2. Instalando Dependências
 
 Após clonar o repositório, instale as dependências necessárias:
 
 ```bash
 npm install
 ```
 
 ### 3. Executando a Aplicação
 
 Para rodar a aplicação localmente, execute o seguinte comando:
 
 ```bash
 npm run dev
 ```
 
 Isso irá iniciar o servidor de desenvolvimento em `http://localhost:3000`.
 
 ## 🛠️ Tecnologias Utilizadas
 
 - **Next.js**: Framework React para renderização do lado servidor e geração de páginas estáticas.
 - **Redux**: Gerenciamento global de estado da aplicação.
 - **React Query**: Para o gerenciamento de estado da API e otimização de consultas.
 - **SASS**: Estilização modular e reutilizável da aplicação.
 - **Docker**: Para configurar e rodar o ambiente de desenvolvimento de forma padronizada.
 
 ## 🔧 Docker
 
 ### 1. Construindo e Rodando a Aplicação com Docker
 
 Certifique-se de que o **Docker** e **Docker Compose** estão instalados no seu sistema.
 
 Para rodar o projeto utilizando Docker, execute o seguinte comando:
 
 ```bash
 docker-compose up --build
 ```
 
 Isso irá iniciar a aplicação em um contêiner Docker.
 
 ### 2. Parando o Docker
 
 Para parar os contêineres, execute:
 
 ```bash
 docker-compose down
 ```
 
 ## 🔄 Funcionalidades
 
 - **Gerenciamento de Produtos**: A aplicação exibe uma lista de produtos, com funcionalidades de **adicionar**, **remover** e **editar**.
 - **Busca de Produtos**: Utiliza **React Query** para realizar consultas eficientes à API de produtos.
 - **Redux**: Utilizado para gerenciar o estado global da aplicação, como a lista de produtos e o status do carrinho de compras.
 
 ## 📋 Testes
 
 Adicionei testes para as interações principais da aplicação, utilizando **Jest** e **React Testing Library**. Para rodar os testes, use:
 
 ```bash
 npm run test
 ```
 
 ## ⚙️ Estrutura de Pastas
 
 ```
 /public
     /images - Imagens utilizadas na aplicação
 /src
     /components - Componentes reutilizáveis
     /pages - Páginas principais da aplicação
     /redux - Estrutura do Redux (actions, reducers)
     /styles - Arquivos SCSS
     /api - Funções de acesso à API
 /docker - Arquivos de configuração Docker
 ```
 
 ## 📝 Documentação do Código
 
 O código foi desenvolvido seguindo as melhores práticas de **Clean Code**. Todos os componentes estão devidamente modularizados e a estrutura do Redux está otimizada para o gerenciamento eficiente do estado global.
 
 ## 📦 Dependências
 
 As dependências principais incluem:
 
 - **Next.js**: Framework para React com renderização no lado servidor.
 - **Redux**: Para gerenciamento de estado.
 - **React Query**: Para gerenciamento de dados assíncronos.
 - **SASS**: Para estilização modular.
 - **Jest**: Para testes de unidade.
 - **Docker**: Para configuração do ambiente.