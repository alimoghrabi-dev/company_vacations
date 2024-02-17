import Type from "@/database/models/type.model";
import User from "@/database/models/user.model";
import Vacation from "@/database/models/vacation.model";
import { authOptions } from "@/lib/authOptions";
import { UserSession } from "@/types/type";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  try {
    const {
      typeId,
      duration,
      phoneNumber,
      reason,
      somethingToSay,
      contactEmail,
    } = await request.json();

    const session = await getServerSession(authOptions);

    if (!typeId || !duration || !phoneNumber || !contactEmail) {
      return new Response("Missing fields", { status: 400 });
    }

    const type = await Type.findById(typeId);

    await Vacation.create({
      type,
      //@ts-ignore
      userId: session?.user?.id,
      duration,
      userPhoneNumber: phoneNumber,
      reason: reason ? reason : null,
      somethingToSay: somethingToSay ? somethingToSay : null,
      status: "Pending",
      contactEmail,
    });

    return new Response("Success", { status: 200 });
  } catch (error) {
    return new Response("Bad request", { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session: UserSession | null = await getServerSession(authOptions);

    if (!session) {
      return new Response("Unauthenticated", { status: 401 });
    }

    const { vacationId } = await request.json();

    await Vacation.findByIdAndDelete(vacationId);

    await User.findByIdAndUpdate(session.user.id, {
      isOnVacation: false,
    });

    return new Response("Deleted", { status: 200 });
  } catch (error) {
    return new Response("Bad request", { status: 400 });
  }
}
