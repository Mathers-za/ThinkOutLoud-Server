import { iUsersModel, iUsersSchema } from "../schema and model/iUsersModel";

declare global {
  namespace Express {
    interface User extends iUsersSchema {}
  }
}
