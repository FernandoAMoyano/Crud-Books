
# Paso 1: Usa una imagen base oficial de Node.js
FROM node:18 AS build

# Paso 2: Establece el directorio de trabajo
WORKDIR /app

# Paso 3: Copia package.json y package-lock.json
COPY client/package*.json ./

# Paso 4: Instala las dependencias
RUN npm install

# Paso 5: Copia el resto de la aplicación
#COPY client/ ./
COPY client/ .

# Paso 6: Construye la aplicación
RUN npm run build

# Paso 7: Sirve la aplicación con un servidor ligero
FROM nginx:alpine

# Paso 8: Copia la salida de la construcción a la carpeta HTML de Nginx
#COPY --from=build /app/dist /usr/share/nginx/html
COPY --from=build /app/dist /usr/share/nginx/html


# Paso 9: Expone el puerto 80
EXPOSE 80

# Paso 10: Inicia Nginx
CMD ["nginx", "-g", "daemon off;"]
