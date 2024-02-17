import Vacation from "@/database/models/vacation.model";

export async function PUT(request: Request) {
  try {
    const { vacationId } = await request.json();

    await Vacation.findByIdAndUpdate(vacationId, {
      status: "Declined",
    });

    return new Response("OK", { status: 200 });
  } catch (error) {
    return new Response("Bad request", { status: 400 });
  }
}
