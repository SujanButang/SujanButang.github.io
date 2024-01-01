var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Column, CreatedAt, DataType, Model, Table, UpdatedAt, } from "sequelize-typescript";
import sequelize from "../config/db";
let Users = class Users extends Model {
};
__decorate([
    Column({
        primaryKey: true,
        type: DataType.UUID,
        defaultValue: DataType.UUIDV4,
    }),
    __metadata("design:type", String)
], Users.prototype, "id", void 0);
__decorate([
    Column({
        type: DataType.STRING,
    }),
    __metadata("design:type", String)
], Users.prototype, "username", void 0);
__decorate([
    Column({
        type: DataType.STRING,
    }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    CreatedAt,
    __metadata("design:type", Date)
], Users.prototype, "created_at", void 0);
__decorate([
    UpdatedAt,
    __metadata("design:type", Date)
], Users.prototype, "updated_at", void 0);
Users = __decorate([
    Table({
        timestamps: true,
        tableName: "users",
        modelName: "Users",
    })
], Users);
sequelize.addModels([Users]);
export default Users;
//# sourceMappingURL=User.js.map