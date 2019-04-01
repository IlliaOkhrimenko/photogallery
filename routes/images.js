var express = require("express");
var router = express.Router();
var multerConfig = require("../config/multer");
var app = express();


router.get ("/get", (req, res) => {
    console.log('get image');
    res.send(_getAllFilesFromFolder("./uploads"));
});

router.post("/images", multerConfig.saveToUploads, (req, res) => {
    return res.json(
        {
            "messege": "file uploaded successfully"
        });
});

var _getAllFilesFromFolder = function(dir) {

    var filesystem = require("fs");
    var results = [];

    filesystem.readdirSync(dir).forEach(function(file) {

        file = dir+'/'+file;
        var stat = filesystem.statSync(file);

        if (stat && stat.isDirectory()) {
            results = results.concat(_getAllFilesFromFolder(file))
        } else results.push(file);

    });

    return results;

};

module.exports = router;