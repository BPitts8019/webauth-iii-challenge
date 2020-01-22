const server = require("./server");
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 8080;

server.listen(port, host, () => {
   console.log(`Server is listening on http://${host}:${port} ...`);
});