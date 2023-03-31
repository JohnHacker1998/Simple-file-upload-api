import multer from "multer"
import { extname } from "path"
import slug from "slug"

//multer disk storage function for defining the filename structure, I used slug to
//make filenames clear and remove unnecessary characters from the name
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/files")
  },
  filename: function (req, file, cb) {
    const ext = extname(file?.originalname)
    const filename = file?.originalname?.split(".")[0]
    let generatedName = slug(filename)

    cb(null, generatedName + ext)
  },
})
//multer upload functionality with additional
//definition of denying files above the file size of 10MB

export const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 10,
    fileSize: 1048576,
  },
})
