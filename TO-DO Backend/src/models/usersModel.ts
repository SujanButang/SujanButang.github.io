import BaseModel from "./baseModel";
import { IUser } from "../interface/IUser";
import { ISignUp } from "../interface/IAuth";

export default class UserModel extends BaseModel {
  static async getByUserName(email: string) {
    const user = await this.queryBuilder()
      .select({
        id: "id",
        username: "username",
        password: "password",
      })
      .from("users");

    return user?.[0];
  }

  static async create(user: ISignUp) {
    return this.queryBuilder().insert(user).table("users");
  }
}
