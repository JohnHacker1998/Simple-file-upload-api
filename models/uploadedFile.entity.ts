import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
} from "typeorm"
//typeorm Uploaded file model

@Entity({ name: "uploaded_files" })
export class UploadedFile {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column()
  filename: string

  @Column()
  file_size: number

  @CreateDateColumn()
  created_at: Date
}
