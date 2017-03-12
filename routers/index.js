let register = require('./register');
let confirm = require('./confirm');
let querystring = require('querystring');


// 404
function handleHttp404(response, ErrorMsg = '404 No Found.') {
    response.writeHead(404);
    response.end(ErrorMsg);
}

// 500
function handleHttp500(response, ErrorMsg = '500 Internal Error') {
    response.writeHead(500);
    response.end(ErrorMsg);
}

// static files eg. js img css
function handdleStatic(url, response) {

}

// url middleware
function handdleUrl(url, request, response) {
    if (url === '/') {
        response.writeHead(200);
        response.write('index');
        response.end();
    } else {
        handdleRegister(url, request, response);
    }
}

function handdleRegister(url, request, response) {
    if (url.match(/\/register(\/)?$/)) {
        switch (request.method) {
            case 'POST':
                let query = '';
                request.on('data', (chunk) => {
                    query += chunk;
                });
                request.on('end', () => {
                    query = query.toLowerCase();
                    let userInfo = querystring.parse(query);
                    let username = userInfo['username'],
                        password = userInfo['password'],
                        email = userInfo['email'],
                        phone = userInfo['phone'];
                    let registerResult = register.process(username, password, email, phone);
                    if (register === 'success') {
                        response.writeHead(200);
                        response.end('Registered successfully!');
                    } else {
                        handleHttp500(response, registerResult);
                    }
                });
                break;
            case 'GET':
                response.writeHead(200);
                response.end('Register page.');
                break;
            default:
                handleHttp500(response);
                break;
        }
    } else {
        handdleConfirm(url, request, response);
    }
}

function handdleConfirm(url, request, response) {
    if (url.match(/\/register(\/)?$/)) {
        let token = url.slice(9);
        let confirmResult = confirm.process(token);
        if(confirmResult === 'success') {
            response.writeHead(200);
            response.end('Confirm successfully!');
        } else {
            handleHttp500(response, 'Confirm failed!');
        }
    } else {
        handleHttp404(response);
    }
}

function processRouter(request, response) {
    // make path valid
    let validUrl = ('/' + request.url.toLowerCase()).replace(/([\/\\]+)/g, '/');
    handdleUrl(validUrl, request, response);
}

exports.process = processRouter;