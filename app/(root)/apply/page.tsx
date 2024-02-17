import ApplyForm from "@/components/ApplyForm";
import Type from "@/database/models/type.model";
import { getUserById } from "@/lib/actions/user.actions";
import { getAllVacationsApplied } from "@/lib/actions/vacation.actions";
import { authOptions } from "@/lib/authOptions";
import { UserSession } from "@/types/type";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Apply = async () => {
  const session: UserSession | null = await getServerSession(authOptions);

  const vacations = await getAllVacationsApplied();

  //@ts-ignore
  const user = await getUserById(session?.user?.id);

  const hasaVacation = vacations?.some((vacation) => {
    vacation.userId === user?._id;
  });

  if (vacations?.length! > 0) {
    if (hasaVacation) {
      redirect("/");
    }
  }

  if (!session || session.user.isOnVacation) {
    redirect("/");
  }

  const types = await Type.find({});

  return (
    <div className="w-full flex flex-col items-center justify-center gap-y-10 py-4">
      <h2 className="text-2xl font-semibold text-gray-900">
        Hello <span className="text-primary">{session.user?.name}</span>, Want a
        Vacation ?
      </h2>
      <ApplyForm
        email={session.user?.email}
        options={types.map((type) => ({
          value: JSON.parse(JSON.stringify(type._id)),
          label: type.typeName,
        }))}
      />
    </div>
  );
};

export default Apply;
