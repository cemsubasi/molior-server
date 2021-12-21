const initExpress = require('./initExpress');

const { DB_CONNECT, PORT } = require('./config');

const server = initExpress();

server.listen(PORT, DB_CONNECT);

