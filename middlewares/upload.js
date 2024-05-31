import path from "node:path"
import multer from "multer"
import crypto from "node:crypto"


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "/tmp")
    }, filename: function (req, file, cb) {
        const extname = path.extname(file.originalname);
        const basename = path.basename(file.originalname, extname);
        const suffix = crypto.randomUUID();

        cb(null, `${basename}-${suffix}${basename}`)
    }
});

export default multer({ storage });