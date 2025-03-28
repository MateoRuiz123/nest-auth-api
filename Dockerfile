# Base image
FROM node:20

# Instalar pnpm globalmente
RUN npm install -g pnpm

# Crear directorio de la aplicación
WORKDIR /usr/src/app

# Copiar los archivos de dependencias
COPY package.json pnpm-lock.yaml ./

# Instalar las dependencias
RUN pnpm install --frozen-lockfile

# Copiar el código fuente de la aplicación
COPY . .

# Construir la aplicación
RUN pnpm build

# Exponer el puerto en el que se ejecutará la aplicación
EXPOSE 3000

# Comando para iniciar el servidor en modo producción
CMD ["pnpm", "start:prod"]
