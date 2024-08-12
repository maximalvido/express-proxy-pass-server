FROM node:18-alpine
WORKDIR /app
COPY . ./
RUN npm ci
COPY . ./
EXPOSE 3000
CMD ["npm", "run", "start"]