var http = require('http');
var url = require('url');
var fs = require('fs');
var path = require('path');
var shortid= require('shortid')

var jsonPath = path.join(__dirname, 'data.json');

console.log('starting server');
http.createServer(function(req, res) {
    var parsedUrl = url.parse(req.url);

    if (parsedUrl.pathname === '/chirps' && req.method === 'GET') {
        // fs.createReadStream(jsonPath)
        // .on('error', function(err) {
        //     res.writeHead(500);
        //     res.end('Could not read file');
        // })
        // .pipe(res);

        fs.readFile(jsonPath, function(err, file) {
            if (err) {
                res.writeHead(500);
                res.end('Could not read file');
            }

            res.write(file);
            res.end();
        });
    

    }else if (parsedUrl.pathname === '/chirps' && req.method === 'POST') {
        var chunks = '',
            data;

        req.on('data', function(chunk) {
            chunks += chunk;

            if (chunks.length > 1e6) {
                req.connection.destroy();
            }

            data = JSON.parse(chunks);
            
            
        });

        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                res.writeHead(500);
                res.end('Could not read file');
            }

            var arr = JSON.parse(file);
            data.id=shortid.generate()
            arr.push(data);
           console.log(data.id)
            fs.writeFile(jsonPath, JSON.stringify(arr), function(err, success) {
                if (err) {
                    res.writeHead(500);
                    res.end('Couldn\'t successfull store data');
                } else {
                    res.writeHead(201, 'Created');
                    res.end(JSON.stringify(arr));
                }
            });
        });
    }else if (parsedUrl.pathname.indexOf('/chirps/one/') > -1 && req.method === 'GET'){
        var lastSlashIndex = parsedUrl.pathname.lastIndexOf('/')
        var id = parsedUrl.pathname.slice(lastSlashIndex+1)


        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                res.writeHead(500);
                res.end('Could not read file');
            }

            var arr = JSON.parse(file);
            var result;
            arr.forEach(function(element) {
                if(element.id=id){
                    result=a
                }
                res.writeHead(200,"OK");
                res.end(JSON.stringify(result))
            });
            fs.writeFile(jsonPath, JSON.stringify(arr), function(err, success) {
                if (err) {
                    res.writeHead(500);
                    res.end('Couldn\'t successfull store data');
                } else {
                    res.writeHead(201, 'Created');
                    res.end(JSON.stringify(arr));
                }
            });
        });
    }
    else if (parsedUrl.pathname.indexOf('/chirps/one/') > -1 && req.method === 'DELETE'){
        var lastSlashIndex = parsedUrl.pathname.lastIndexOf('/')
        var id = parsedUrl.pathname.slice(lastSlashIndex+1)


        fs.readFile(jsonPath, 'utf-8', function(err, file) {
            if (err) {
                res.writeHead(500);
                res.end('Could not read file');
            }

            var arr = JSON.parse(file);
            var result;
            var deleteIndex=-1
            arr.forEach(function(element,i) {
                if(element.id===id){
                    deleteIndex=i;
                }
                    // res.writeHead(200,"OK");
                    // res.end(JSON.stringify(result))
                if(deleteIndex != -1){
                    arr.splice(deleteIndex,1);
                                fs.writeFile(jsonPath, JSON.stringify(arr), function(err, success) {
                if (err) {
                    res.writeHead(500);
                    res.end('Couldn\'t successfull store data');
                } else {
                    res.writeHead(201, 'Created');
                    res.end(JSON.stringify(arr));
                }
            });
                }
                // res.writeHead(200,"OK");
                // res.end(JSON.stringify(result))
            });

        });
    }
})
.listen(3000);
// }else if (parsedUrl.indexOf('/chirps/one/') > -1 && req.method === 'DELETE') {
//         fs.readFile(jsonPath, 'utf-8', function(err,file){
//             if (err) {
//                 res.writeHead(500);
//                 res.end('Could not read file');
//             }
//             var arr = JSON.parse(file)
//             // arr.splice(arr[0].id)
            
//             //  data.id=data.length+1
//             for(var i=0;i<arr.length;i++){
//                 var id = arr[i]
//                 arr.splice(id)
//                 console.log("loop")
//             }
//         fs.writeFile(jsonPath, JSON.stringify(arr), function(err, success) {
//             if (err) {
//                 res.writeHead(500);
//                 res.end('Couldn\'t successfull store data');
//             } else {
//                 res.writeHead(201, 'Created');
//                 res.end(JSON.stringify(arr));
//             }
//             });
//         })