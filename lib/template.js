module.exports = {
    html:function(title, nav, body){
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
                    ${body}
                </div>
                <input type="button" value="night" onclick="
                    nightDayHandler(this);
                ">
            </body>
        </html>
        `
    },
    list:function(filelist){
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
    },
    navbar:function(filelist){
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
};
