FROM node:12-alpine

WORKDIR /opt/app

COPY package.json .
RUN npm install --quiet

# Copia la Aplicación
COPY . .

EXPOSE 3000

CMD ["npm", "run", "start"]
