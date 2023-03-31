import { NextFunction, Request, Response } from "express"
import asyncHandler from "express-async-handler"
import { UploadedFile } from "../models/uploadedFile.entity"
import { AppDataSource } from "../data-source"
import fs from "fs"
let uploadedFileRepository = AppDataSource.getRepository(UploadedFile)

//functionality of getting file with table structure
export const getFile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let getFiles = await uploadedFileRepository.createQueryBuilder(
      "uploaded_files"
    )
    if (req?.query?.id)
      await getFiles.where("uploaded_files.id=:fileID", {
        fileID: req.query.id,
      })

    if (req?.query?.filename)
      await getFiles.andWhere("uploaded_files.filename like :fileName", {
        fileName: `%${req.query.filename}%`,
      })

    res.status(200).json({
      data: await getFiles.getMany(),
    })
  }
)
//add file logic
export const addFile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (req?.file) {
      let uploaded_file = await uploadedFileRepository.create({
        filename: req?.file.filename,
        file_size: req?.file.size,
      })
      await uploadedFileRepository.save(uploaded_file)
      res.status(200).json({
        message: "File is uploaded successfully"!,
      })
    } else {
      res.status(400).json({
        message: "File is not found!",
      })
    }
  }
)

//delete file logic
export const deleteFile = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    let file = res.locals.uploadedFile
    let filePath = "public/files/" + file.filename
    await uploadedFileRepository.delete({ id: req.params.uploadedFileID })
    await fs.unlink(filePath, (err) => {
      if (err) {
      }
    })
    res.status(200).json({
      message: "File is deleted successfully!",
    })
  }
)
