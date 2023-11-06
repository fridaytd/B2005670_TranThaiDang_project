const multer = require("multer")

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(file);
        cb(null, "public/images/uploads")
    },
    filename: function (req, file, cb) {
        // console.log(file);
        const extArray = file.mimetype.split('/')
        const extension = extArray[extArray.length - 1]
        let name = "file"
        if (req.body.name) {
            name = req.body.name.replace(/\s+/g, '');
        }

        cb(null, name + '-' + Date.now() + '.' + extension)
    }
})

var upload = multer({ storage: storage })

module.exports = upload