FROM fermium:slim
WORKDIR /app
COPY . .
RUN npm i && PUBLIC_URL=https://kartalla.dev/tampere/ npm run build

