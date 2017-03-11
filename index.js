const http = require('http');
const query = require('querystring');
const routers = require('./routers');

let server = http.createServer(function(request, response){
    routers.process(request, response);
});

server.listen(80);