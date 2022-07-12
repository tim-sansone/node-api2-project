// require your server and launch it here
const server = require('./api/server')

const port = 9000;

server.listen(port, (req, res) => {
    console.log(`server running on port ${port}`)
})
