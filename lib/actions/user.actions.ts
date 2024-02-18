import { connectToDatabase } from "@/database/models/connect";
import User from "@/database/models/user.model";

export async function getUserById(params: {
  userId: string | undefined | null;
}) {
  try {
    connectToDatabase();

    const user = await User.findById(params.userId);

    if (!user) return null;

    return user;
  } catch (error) {
    console.log(error);
  }
}
