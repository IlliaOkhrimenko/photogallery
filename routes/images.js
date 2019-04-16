const express = require("express");
const router = express.Router();
const multerConfig = require("../config/multer");
const fs = require("fs");


router.get ("/get", (req, res) => {
    res.send(_getAllFilesFromFolder("./uploads"));
});

router.post("/images", multerConfig.saveToUploads, (req, res) => {
    if (!req.file) {
         return res.status(400).json({
            success: false,
            "msg": "No file uploaded"
        })

    } else {
        return res.json({
            success: true,
            "msg": "File uploaded successfully"
        });
    }
});

var _getAllFilesFromFolder = function(dir) {

    var results = [];

    fs.readdirSync(dir).forEach(function(file) {

       // file = dir+'/'+file;
        var stat = fs.statSync(dir+'/'+file);

        if (stat && stat.isDirectory()) {
            results = results.concat(_getAllFilesFromFolder(file))
        } else results.push("http://localhost:5000/" + file);

    });

    return results;

};


module.exports = router;