import { Schema, models, model, Document } from "mongoose";

export interface IVacation extends Document {
  type: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  duration: number;
  userPhoneNumber: string;
  reason: string;
  somethingToSay: string;
  contactEmail: string;
  status: string;
  startDate: Date;
  endDate: Date;
}

const vacationSchema = new Schema<IVacation>(
  {
    type: {
      type: Schema.Types.ObjectId,
      ref: "Type",
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    duration: {
      type: Number,
      required: true,
      min: 1,
    },
    userPhoneNumber: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
    },
    somethingToSay: {
      type: String,
    },
    contactEmail: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Approved", "Declined"],
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

const Vacation = models.Vacation || model("Vacation", vacationSchema);

export default Vacation;
