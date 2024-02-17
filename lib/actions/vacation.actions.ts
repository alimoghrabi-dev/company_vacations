"use server";

import { ConnectToDB } from "@/database/connection";
import Vacation from "@/database/models/vacation.model";

export async function getCurrentUserVacation(
  userId: string | null | undefined
) {
  try {
    ConnectToDB();

    const vacation = await Vacation.findOne({ userId });

    if (!vacation) return null;

    return vacation;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllVacationsApplied() {
  try {
    ConnectToDB();

    const vacations = await Vacation.find({});

    if (!vacations) return null;

    return vacations;
  } catch (error) {
    console.log(error);
  }
}
