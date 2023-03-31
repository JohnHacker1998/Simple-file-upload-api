import { AppDataSource } from "../data-source"
import { UploadedFile } from "../models/uploadedFile.entity"
import asyncHandler from "express-async-handler"
import { Request, Response, NextFunction } from "express"
import { AppError } from "../appError"

//repository for doing the database crud
let uploadedFileRepository = AppDataSource.getRepository(UploadedFile)

//a middleware function that checks if the provided id exists in the database
export const checkFileExistence = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.params?.uploadedFileID)
    if (req.params?.uploadedFileID) {
      let foundUploadedFile = await uploadedFileRepository.findOne({
        where: {
          id: req.params.uploadedFileID,
        },
      })
      if (foundUploadedFile) {
        res.locals.uploadedFile = foundUploadedFile
        next()
      } else {
        throw new AppError("File is not found", 404)
      }
    } else {
      throw new AppError("Provided file id is invalid!", 400)
    }
  }
)
