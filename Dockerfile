FROM node:20.13.1
WORKDIR /app
COPY . .
COPY .env .
RUN npm install
CMD ["npm", "run", "start"]
EXPOSE 3000