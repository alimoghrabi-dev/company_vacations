import { ConnectToDB } from "@/database/connection";
import User from "@/database/models/user.model";

export async function getUserById(params: {
  userId: string | undefined | null;
}) {
  try {
    ConnectToDB();

    const user = await User.findById(params.userId);

    if (!user) return null;

    return user;
  } catch (error) {
    console.log(error);
  }
}
