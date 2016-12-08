const fs = require('fs');

const app = require(__root + '/server.js');

const formidable = require('formidable');

app.post('/formidable', function(req,res){
    const form = new formidable.IncomingForm();
    form.multiples = true;
    form.uploadDir = "./uploads";

    form.parse(req, function(err, fields, files) {
        console.log(fields);
        console.log(files);

        //TODO SEND FILES TO S3 HERE

        files.files.map(function(file){
           fs.unlink('./' + file.path);
        });
    });

    res.send('success');
});