import { connectToDatabase } from "@/database/models/connect";
import User from "@/database/models/user.model";
import bcryptjs from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    connectToDatabase();

    if (!name || !email || !password) {
      return new Response("Missing fields", { status: 400 });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return new Response("User already exists", { status: 409 });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return Response.json(newUser, { status: 201 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
