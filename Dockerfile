
# Etapa 1: COMPILACIÓN

FROM node:18 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias de producción y desarrollo
RUN npm install

# Copia el código de la aplicación
COPY . .

# Compila TypeScript a JavaScript
RUN npm run build

# Copia el archivo openapi.json al contenedor
COPY openapi.json /app/path/in/container/openapi.json

# Agrega un comando para verificar el contenido de /app/dist
RUN ls -al /app/dist


# Etapa 2: PRODUCCIÓN
FROM node:18 AS production

# Establece el directorio de trabajo en el contenedor
WORKDIR /app

# Copia solo las dependencias de producción desde la etapa de construcción
COPY --from=build /app/node_modules /app/node_modules

# Copia el código compilado
COPY --from=build /app/dist /app/dist

# Copia el archivo openapi.json al contenedor
#COPY --from=build /app/path/in/container/openapi.json /app/path/in/container/openapi.json

# Copia otros archivos necesarios como los de configuración
COPY .env ./

# Agrega un comando para verificar el contenido de /app/dist
RUN ls -al /app/dist

# Expone el puerto (por ejemplo 3000, según donde corra tu API)
EXPOSE 3000

# Inicia la aplicación
CMD ["node", "dist/index.js"]
