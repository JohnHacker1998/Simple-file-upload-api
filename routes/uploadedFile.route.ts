import express, { Router } from "express"
import {
  addFile,
  deleteFile,
  getFile,
} from "../controllers/uploadedFile.controller"
import { checkFileExistence } from "../middleware/checkFileExistence.middleware"
import { upload } from "../middleware/uploadFile.multer"

export const uploadedFileRouter: Router = express.Router()

uploadedFileRouter.get("/", getFile)
uploadedFileRouter.post("/", upload.single("file"), addFile)
uploadedFileRouter.delete("/:uploadedFileID", checkFileExistence, deleteFile)
