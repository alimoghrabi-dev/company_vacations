import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getCurrentUserVacation } from "@/lib/actions/vacation.actions";
import { IVacation } from "@/database/models/vacation.model";
import { findTypeById } from "@/lib/actions/type.actions";
import CancelApply from "@/components/CancelApply";
import { cn } from "@/lib/utils";
import { UserSession } from "@/types/type";

const Dashboard = async () => {
  const session: UserSession | null = await getServerSession(authOptions);

  if (!session) {
    redirect("/");
  }

  //@ts-ignore
  const vacation: IVacation = await getCurrentUserVacation(
    //@ts-ignore
    JSON.parse(JSON.stringify(session?.user?.id))
  );

  const type = await findTypeById(vacation?.type);

  return vacation ? (
    <Table>
      <TableCaption>A list of your current vacation</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Cancel</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Type</TableHead>
          {session.user.isOnVacation ? (
            <TableHead>Start - End Date</TableHead>
          ) : (
            <>&nbsp;</>
          )}
          <TableHead className="text-right">Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <CancelApply vacationId={JSON.parse(JSON.stringify(vacation._id))} />
          <TableCell>{vacation.duration} days</TableCell>
          <TableCell className="font-medium">{type.typeName}</TableCell>
          <TableCell>
            {session.user.isOnVacation ? (
              <>
                {vacation.startDate.toLocaleDateString()} -{" "}
                {vacation.endDate.toLocaleDateString()}
              </>
            ) : null}
          </TableCell>
          <TableCell
            className={cn(
              "text-right",
              vacation.status === "Approved"
                ? "text-green-500 font-medium"
                : vacation.status === "Declined"
                ? "text-red-500 font-medium"
                : "text-gray-800"
            )}>
            {vacation.status}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ) : (
    <h3 className="text-gray-900 font-semibold text-2xl text-center pt-12">
      No vacation submited yet.
    </h3>
  );
};

export default Dashboard;
