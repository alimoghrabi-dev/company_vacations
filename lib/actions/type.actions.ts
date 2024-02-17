import Type from "@/database/models/type.model";
import { ObjectId } from "mongoose";

export async function findTypeById(typeId: ObjectId) {
  try {
    const type = await Type.findById(typeId);

    return type;
  } catch (error) {
    console.log(error);
  }
}
