const app = require(__root + '/server.js');

const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __root + '/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now());
    }
})

const upload = multer({ storage: storage}, fileFilter )

function fileFilter (req, file, cb) {
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted

    // To reject this file pass `false`, like so:
    //cb(null, false)

    // To accept the file pass `true`, like so:
    cb(null, true)

    // You can always pass an error if something goes wrong:
    //cb(new Error('I don\'t have a clue!'))
}

app.post('/upload', upload.array('files'), function(req,res){
    console.log(req.files);
    res.send('success');
});