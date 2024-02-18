import { connectToDatabase } from "@/database/models/connect";
import Vacation from "@/database/models/vacation.model";

export async function getCurrentUserVacation(
  userId: string | null | undefined
) {
  try {
    connectToDatabase();

    const vacation = await Vacation.findOne({ userId });

    if (!vacation) return null;

    return vacation;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllVacationsApplied() {
  try {
    connectToDatabase();

    const vacations = await Vacation.find({});

    if (!vacations) return null;

    return vacations;
  } catch (error) {
    console.log(error);
  }
}
