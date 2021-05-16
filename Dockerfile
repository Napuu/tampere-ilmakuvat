FROM node:fermium-slim
WORKDIR /app
COPY . .
RUN npm i 
CMD PUBLIC_URL=https://kartalla.dev/tampere/ npm run build

