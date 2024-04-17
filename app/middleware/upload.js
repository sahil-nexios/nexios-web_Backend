const multer = require('multer')
const directery = "upload/resume";
const fs = require('fs');

if (!fs.existsSync(directery)) {
    fs.mkdir(directery);
}

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "upload/resume");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `resume-${file.originalname.split(".")[0]}-${Date.now()}.${ext}`);
    },
});


const upload = multer({
    storage: multerStorage,
}).single('file')

module.exports = {upload}
