# Usa a imagem do Node.js 22 como base
FROM node:22.13.1

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências do backend primeiro
COPY backend/package.json backend/package-lock.json ./
RUN npm install --omit=dev

# Copia todo o código do backend para dentro do container
COPY backend .

# Expõe a porta usada pelo backend
EXPOSE 3001

# Comando para iniciar o backend
CMD ["node", "server.js"]
