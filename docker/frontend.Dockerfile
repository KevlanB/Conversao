# Usa a imagem do Node.js 22 como base
FROM node:22.13.1

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos de dependências do frontend primeiro
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install --omit=dev

# Copia todo o código do frontend para dentro do container
COPY frontend .

# Constrói o frontend (caso seja um projeto React/Vite)
RUN npm run build

# Expõe a porta usada pelo frontend
EXPOSE 3000

# Comando para rodar o frontend em modo de produção
CMD ["npm", "start"]
