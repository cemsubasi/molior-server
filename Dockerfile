FROM node:14-slim
WORKDIR /opt/molior-server/
COPY . .
RUN npm install
CMD npm start
