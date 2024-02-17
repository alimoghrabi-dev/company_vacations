import mongoose from "mongoose";
import Type from "../database/models/type.model";

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://AliMoghrabi:Aliishere1@cluster0.yjjce47.mongodb.net/company_vacs?retryWrites=true&w=majority"
    );

    const options = [
      {
        type: "Parent Leave",
      },
      {
        type: "Sick Leave",
      },
      {
        type: "Casual Leave",
      },
      {
        type: "Unpaid Leave",
      },
      {
        type: "Annual Leave",
      },
      {
        type: "Vacation",
      },
      {
        type: "Study Leave",
      },
      {
        type: "Personal Time Off",
      },
      {
        type: "Marriage Leave",
      },
      {
        type: "Public Holiday",
      },
      {
        type: "Religious Holiday",
      },
      {
        type: "Sabbatical",
      },
    ];

    for (const option of options) {
      await Type.create({
        typeName: option.type,
      });
    }

    console.log("Database seeded");
  } catch (error) {
    console.log("Error seeding database", error);
  }
}

main();
