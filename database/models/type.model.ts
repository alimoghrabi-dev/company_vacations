import { Schema, models, model, Document } from "mongoose";

export interface IType extends Document {
  typeName: string;
  usersHasThisType: Schema.Types.ObjectId[];
}

const typeSchema = new Schema<IType>({
  typeName: {
    type: String,
  },
  usersHasThisType: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
});

const Type = models.Type || model("Type", typeSchema);

export default Type;
