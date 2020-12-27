var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title, list, nav, body){
    return `
    <!doctype html>
    <html>
        <head>
            <title>WEB - ${title}</title>
            <meta charset="utf-8">
            <link rel="stylesheet" href="style.css">
            <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
            <script src="colors.js"></script>
        </head>
        <body>
            <div class="nav">
                <h1><a href="/">WEB</a></h1>
                ${nav}
            </div>
            <input type="button" value="night" onclick="nightDayHandler(this);">
            <div id="grid">
                ${list}
                <a href="/create">create</a>
                ${body}
                </div>
            </div>
            <input type="button" value="night" onclick="
                nightDayHandler(this);
            ">
        </body>
    </html>
    `
}

function templateList(filelist){
    var list = '<ol>';
    var i = 0;
    while(i < filelist.length){
        if(filelist[i]!='main'){
            list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
        }
        i = i + 1;
    }
    list = list + '</ol>';
    return list;
}

function templateNavbar(filelist){
    var nav = '<span class="nav__items">';
    var i = 0;
    while(i<filelist.length){
        if(filelist[i]!='main'){
            nav = nav + `<span class = "item">
                <a href="/?id=${filelist[i]}">${filelist[i]}</a>
                </span>`;
        }
        i = i + 1;
    }
    nav = nav + '</span>';
    return nav;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;
    var title = queryData.id;
    console.log('pathname ', pathname);
    if(pathname === '/'){
        var id = queryData.id;
        if(queryData.id === undefined){
            id = 'main';
            title = 'Welcome';
        }
        fs.readdir('./data', function(error, filelist){
            fs.readFile(`data/${id}`, 'utf8', function(err, description){
                var list = templateList(filelist);
                var nav = templateNavbar(filelist);
                var template = templateHTML(title, list, nav, `<h2>${title}</h2>${description}`);
                response.writeHead(200);
                response.end(template);
            })
        });
    } else if(pathname === '/create'){
        id = 'main';
        title = 'create';
        fs.readdir('./data', function(error, filelist){
            fs.readFile(`data/${id}`, 'utf8', function(err, description){
                var list = templateList(filelist);
                var nav = templateNavbar(filelist);
                var template = templateHTML(title, list, nav, `
                    <form action="http://localhost:3000/create_process" method="post">
                        <p><input type="text" name="title" placeholder="title"></p>
                        <p>
                            <textarea name="description" placeholder="description"></textarea>
                        </p>
                        <p>
                            <input type="submit">
                        </p>
                    </form>
                `);
                response.writeHead(200);
                response.end(template);
            })
        });
    } else if(pathname === '/create_process'){
        var body = '';
        console.log('qs ', qs);
        request.on('data', function(data){
            console.log('data ', data);
            body = body + data;
        });
        console.log('body ', body.length);
        request.on('end', function(){
            var post = qs.parse(body);
            var title = post.title;
            var description = post.description;
            fs.writeFile(`data/${title}`, description, 'utf8', function(err){
                response.writeHead(302, {Location: `/?id=${title}`});
                response.end();
            });
        });
    }
    else{
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);