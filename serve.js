var http = require("http"),
    url  = require("url"),
    path = require("path"),
    fs   = require("fs"),
    base = process.cwd,
    port = 1337,
    def  = "/index.html";

[].shift.call(process.argv);    // program
[].shift.call(process.argv);    // file
if (process.argv.length > 0) {
    port = parseInt([].shift.call(process.argv), 10);
}

http.createServer(function (request, response) {
    var root     = "",
        uri      = root + url.parse(request.url).pathname,
        filename = path.join(base(), uri),
        throwErr = function (error, code) {
            response.writeHead(code, {"Content-Type": "text/plain"});
            response.write(code + " \n" + error + " \n");
            response.end();
        };

    fs.exists(filename, function(exists) {
        if (!exists) { return throwErr("Not Found", 404); }

        if (fs.statSync(filename).isDirectory()) {
            filename += def;
        }

        fs.readFile(filename, "binary", function(error, file) {
            if (error) { return throwErr(error, 500); }

            response.writeHead(200);
            response.write(file, "binary");
            response.end();
        });
    });
}).listen(parseInt(port, 10), "127.0.0.1");

console.log("Static file server running at\n  => http://127.0.0.1:" + port + "/\nCTRL + C to shutdown");
