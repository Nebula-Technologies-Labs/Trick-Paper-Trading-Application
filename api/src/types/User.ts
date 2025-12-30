import { Schema } from "mongoose";

type userRole = "USER";

export interface UserDTO {
  _id: Schema.Types.ObjectId;
  userId: string;
  userName: string;
  password: string;
  role: userRole;
  email: string;
  phoneNumber: string;
  adhaarNumber: string;
  pancardNumber: string;
  optMargin: number;
  futMargin: number;
  optBrokerage: number;
  futBrokerage: number;
  availableFunds: number;
}
