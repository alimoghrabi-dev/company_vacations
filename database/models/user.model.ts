import { Schema, models, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  picture: string;
  isAdmin: boolean;
  isOnVacation: boolean;
  vacationStart: Date;
  vacationEnd: Date;
  joinedAt: Date;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isOnVacation: {
    type: Boolean,
    default: false,
  },
  vacationStart: {
    type: Date,
  },
  vacationEnd: {
    type: Date,
  },
  joinedAt: {
    type: Date,
    default: Date.now,
  },
});

const User = models.User || model("User", userSchema);

export default User;
