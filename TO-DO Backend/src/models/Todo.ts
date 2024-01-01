import sequelize from "../config/db";
import {
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from "sequelize-typescript";
import Users from "./User";

@Table({
  timestamps: true,
  tableName: "todo",
  modelName: "Todos",
})
class Todos extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare id: string;

  @Column({
    type: DataType.STRING,
  })
  declare title: string;

  @Column({
    type: DataType.BOOLEAN,
  })
  declare completed: boolean;

  @ForeignKey(() => Users)
  @Column({
    type: DataType.UUID,
  })
  declare userId: string;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;
}

sequelize.addModels([Todos]);
export default Todos;
