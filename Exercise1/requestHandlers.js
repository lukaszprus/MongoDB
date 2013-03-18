var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("./node_modules/formidable"),
    mongodb = require("./mongodb.js");



function start(response) {
    console.log("Request handler 'start' was called.");

    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" ' +
        'content="text/html; charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<form action="/upload" ' + 'method="post">' +
        '<input type="text" name="first_name" /><br />' +
        '<input type="text" name="last_name" /><br />' +
        '<input type="text" name="email" /><br />' +
        '<input type="text" name="age" /><br />' +
        '<input type="submit" value="Submit" />' +
        '</form>' +
        '</body>' +
        '</html>';

    response.writeHead(200, {
        "Content-Type": "text/html"
    });
    response.write(body);

	mongodb.listUsers( function (err, result) {
		if (err) {
			response.end('<p>Failed to retrieve users. Try again.</p>');
		} else {
			console.log(result);
			response.end();
		}
	});
}

function upload(response, request) {
    console.log("Request handler 'upload' was called.");
    var form = new formidable.IncomingForm();
    console.log("about to parse");
    form.parse(request, function (error, fields, files) {

        /* console.log("Submitted values:");
        for (var i in fields) {
            console.log(fields[i]);
        } */

        var user = {
            first_name: fields.first_name,
            last_name: fields.last_name,
            email: fields.email,
            age: fields.age
        };

        mongodb.addUser(user, function (err, result) {
            response.writeHead(200, {
                "Content-Type": "text/html"
            });
            if (err) {
                response.end('<p>There was a problem submitting your form. Try again.</p>');
            } else {
                response.end('<p>Thank you for submitting the form.</p>');
            }
        });



    });

}

function show(response) {
    console.log("Request handler 'show' was called.");
    fs.readFile("/tmp/test.png", "binary", function (error, file) {
        if (error) {
            response.writeHead(500, {
                "Content-Type": "text/plain"
            });
            response.write(error + "\n");
            response.end();
        } else {
            response.writeHead(200, {
                "Content-Type": "image/png"
            });
            response.write(file, "binary");
            response.end();
        }
    });
}

exports.start = start;
exports.upload = upload;
exports.show = show;