import { connectToDatabase } from "@/database/models/connect";
import Type from "@/database/models/type.model";
import { ObjectId } from "mongoose";

export async function findTypeById(typeId: ObjectId) {
  try {
    connectToDatabase();

    const type = await Type.findById(typeId);

    return type;
  } catch (error) {
    console.log(error);
  }
}
