# Usando imagem base Node
FROM node:18-alpine

# Definindo o diretório de trabalho
WORKDIR /app

# Copiando arquivos de dependências
COPY package.json package-lock.json ./

# Instalando dependências
RUN npm install

# Copiando o restante do código
COPY . .

# Expondo a porta
EXPOSE 3000

# Comando para rodar o app
CMD ["npm", "start"]
