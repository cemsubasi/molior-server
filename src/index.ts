import initExpress from './initExpress';

import { DB_CONNECT, PORT } from './config';

const server = initExpress();

server.listen(PORT, DB_CONNECT);
