const app = require(__root + '/server.js');

const multiparty = require('multiparty');

app.post('/multiparty', function(req,res){
    const form = new multiparty.Form({
        autoFiles: false,
        autoFields: false,
        uploadDir: "./uploads"
    });

    form.parse(req);

    res.send('success');
});