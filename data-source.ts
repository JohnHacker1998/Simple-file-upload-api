import "reflect-metadata"
import { DataSource } from "typeorm"
import { UploadedFile } from "./models/uploadedFile.entity"

//data source definition where the database configuration is defined
export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "johnhacker1998",
  password: "password",
  database: "upload_db",
  synchronize: true,
  logging: false,
  entities: [UploadedFile],
  migrations: [],
  subscribers: [],
})
