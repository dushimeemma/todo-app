const jsonServer = require('json-server');
const cors = require('cors');

const server = jsonServer.create();
const middlewares = jsonServer.defaults();

server.use(cors());

server.use(middlewares);

const router = jsonServer.router('db.json');

server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});

module.exports = server;
