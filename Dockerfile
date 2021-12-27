FROM node:14-slim
WORKDIR /opt/molior-server/
COPY . .
RUN npm install
RUN npm run build
CMD npm start
