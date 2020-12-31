var fs = require('fs');
module.exports = {
    css: function(request, response){
        response.writeHead(200, {'Content-type' : 'text/css'});
        var fileContents = fs.readFileSync('public/css/style.css', {encoding: 'utf8'});
        response.write(fileContents);
        response.end();
    },
    js: function(request, response){
        response.writeHead(200, {'Content-type' : 'text/javascript'});
        var fileContents = fs.readFileSync('public/js/colors.js', {encoding: 'utf8'});
        response.write(fileContents);
        response.end();
        
    },
    image: function(request, response){
        response.writeHead(200, {'Content-type' : 'image/jpg'});
        var fileContents = fs.readFileSync('public/images/web.jpg');
        response.write(fileContents);
        response.end();
    }
}

