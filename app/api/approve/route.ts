import { connectToDatabase } from "@/database/models/connect";
import User from "@/database/models/user.model";
import Vacation from "@/database/models/vacation.model";

export async function PUT(request: Request) {
  try {
    const { vacationId, vacationUserId } = await request.json();

    connectToDatabase();

    const vacation = await Vacation.findById(vacationId);

    const startDate = new Date();
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + vacation.duration);

    await Vacation.findByIdAndUpdate(vacationId, {
      status: "Approved",
      startDate,
      endDate,
    });

    await User.findByIdAndUpdate(vacationUserId, {
      isOnVacation: true,
      vacationStart: startDate,
      vacationEnd: endDate,
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    return new Response("Bad request", { status: 400 });
  }
}
