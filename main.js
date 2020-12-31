var http = require('http');//get 'http' module
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');
var static = require('./lib/static.js');
var path = require('path');
var sanitizeHtml = require('sanitize-html');

// app -> http.Server
var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;

    console.log('pathname ', pathname);
    if(pathname === '/'){
        var title = queryData.id;
        var id = queryData.id;
        var control = '<a href="/create">create</a> ';
        if(queryData.id === undefined){
            id = 'main';
            title = 'Welcome';
        }
        else{
            control =  control + `<a href="/update?id=${id}">update</a> `;
            control = control + 
            `<form action="delete_process" method="post">
                <input type="hidden" name="id" value="${title}">
                <input type="submit" value="delete">
            </form>`;
        }
        fs.readdir('./data', function(error, filelist){
            var filteredId = path.parse(id).base;
            fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
                var sanitizedTitle = sanitizeHtml(title);
                var sanitizedDescription = sanitizeHtml(description);
                //var list = template.list(filelist);
                 var nav = template.navbar(filelist);
                var html = template.html(sanitizedTitle, nav, `<h2>${sanitizedTitle}</h2>${control}${sanitizedDescription}`);
                response.writeHead(200);
                response.end(html);
            });
        });
    } else if(pathname === '/create'){
        var id = 'main';
        var title = 'create';
        fs.readdir('./data', function(error, filelist){
            var filteredId = path.parse(id).base;
            fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
                //var list = template.list(filelist);
                var nav = template.navbar(filelist);
                var html = template.html(title, nav, `
                    <form action="http://localhost:3000/create_process" method="post">
                        <p><input type="text" name="title" placeholder="title"></p>
                        <p>
                            <textarea name="description" placeholder="description"></textarea>
                        </p>
                        <p>
                            <input type="submit">
                        </p>
                    </form>
                `, '');
                response.writeHead(200);
                response.end(html);
            })
        });
    } else if(pathname === '/create_process'){
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                response.writeHead(302, {Location: `/?id=${title}`});
                response.end();
            });
        });
    } else if(pathname === '/update'){
        fs.readdir('./data', function(error, filelist){
            var filteredId = path.parse(title).base;
            fs.readFile(`data/${filteredId}`, 'utf8', function(err, description){
                //var list = template.list(filelist);
                var nav = template.navbar(filelist);
                var html = template.html(title, nav, 
                `
                <form action="http://localhost:3000/update_process" method="post">
                    <input type="hidden" name="id" value="${title}">
                    <p><input type="text" name="title" placeholder="title" value=${title}></p>
                    <p>
                        <textarea name="description" placeholder="description">${description}</textarea>
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                </form>
                `, '');
                response.writeHead(200);
                response.end(html);
            })
        });
    } else if(pathname === '/update_process'){
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var id = post.id;
            var title = post.title;
            var description = post.description;
            fs.rename(`data/${id}`, `data/${title}`, function(err){
                fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                    response.writeHead(302, {Location: `/?id=${title}`});
                    response.end();
                })
            });
            console.log(post);
        });
    }else if(pathname === '/delete_process'){
        var body = '';
        request.on('data', function(data){
            body = body + data;
        });
        request.on('end', function(){
            var post = qs.parse(body);
            var id = post.id;
            var filteredId = path.parse(id).base;
            fs.unlink(`data/${filteredId}`, function(err){
                response.writeHead(302, {Location: `/`});
                response.end();
            });
            console.log(post);
        });
    }else if(request.url === '/style.css'){
        static.css(request, response);
    }else if(request.url === '/colors.js'){
        static.js(request, response);
    }else if(request.url === '/web.jpg'){
        static.image(request, response);
    }
    else{
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);

