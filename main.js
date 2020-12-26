var http = require('http');
var fs = require('fs');
var url = require('url');

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
        
    } else{
        response.writeHead(404);
        response.end('Not found');
    }
});
app.listen(3000);