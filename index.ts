import express, { Application, NextFunction, Request, Response } from "express"
import cors from "cors"
import { AppDataSource } from "./data-source"
import dotenv from "dotenv"
import { uploadedFileRouter } from "./routes/uploadedFile.route"
import { AppError } from "./appError"
dotenv.config()
const app: Application = express()
//cors definition
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
)
app.use(express.json())
//static route for accessing files
app.use("/files", express.static("public/files"))

AppDataSource.initialize()
  .then(async () => {
    console.log("Database Started successfully!!")
  })
  .catch((error) => console.log(error))

app.use("/api/uploaded-file", uploadedFileRouter)

//global router for handling not found routes
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`can't find ${req.originalUrl} on this server!`, 404))
})
//global exception handling route
app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
  const errorStatus = err.statusCode || 500
  const errorMessage = err.message || "Something went wrong!"
  return res.status(errorStatus).json({
    status: err.status,
    message: errorMessage,
    stack: err.stack,
  })
})
//port definition using dotenv package
app.listen(process.env.PORT_NUMBER, () => {
  console.log("Server Started successfully!!")
})
