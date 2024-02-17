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
import { findTypeById } from "@/lib/actions/type.actions";
import { getInitials } from "@/lib/utils";
import { UserSession } from "@/types/type";
import { getAllVacationsApplied } from "@/lib/actions/vacation.actions";
import { getUserById } from "@/lib/actions/user.actions";
import { IUser } from "@/database/models/user.model";
import Image from "next/image";
import DenyApprove from "@/components/DenyApprove";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { MoreVertical } from "lucide-react";
import { Input } from "@/components/ui/input";

const AdminDashboard = async () => {
  const session: UserSession | null = await getServerSession(authOptions);

  if (!session?.user.isAdmin || !session) {
    redirect("/");
  }

  const vacations = await getAllVacationsApplied();

  return vacations?.length! > 0 ? (
    <Table>
      <TableCaption>A list of your current applied vacations</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Duration</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Start - End Date</TableHead>
          <TableHead className="text-right">Deny / Approve</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vacations?.map(async (vacation) => {
          const type = await findTypeById(vacation.type);
          const user: IUser = await getUserById({
            userId: vacation.userId,
          });

          return (
            <TableRow className="hover:bg-gray-200/90 transition">
              <TableCell className="flex gap-x-1.5 items-center">
                <Dialog>
                  <DialogTrigger>
                    <MoreVertical
                      size={21}
                      className="text-gray-900 hover:text-gray-700 transition cursor-pointer"
                    />
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle className="text-gray-900 text-xl">
                        {type?.typeName} Vacation for
                        <span className="text-primary"> {user?.name}</span>
                      </DialogTitle>
                    </DialogHeader>
                    <div className="w-full h-px bg-black/[0.15]" />
                    <DialogDescription className="space-y-4">
                      {vacation.reason && (
                        <div className="space-y-0.5">
                          <label
                            htmlFor="reason"
                            className="text-sm font-medium text-gray-800">
                            Reason
                          </label>
                          <Input
                            id="reason"
                            placeholder={vacation.reason}
                            readOnly
                            className="focus-visible:ring-0 focus-visible:border-gray-400/60 transition-all outline-none"
                          />
                        </div>
                      )}

                      <div className="space-y-0.5">
                        <label
                          htmlFor="number"
                          className="text-sm font-medium text-gray-800">
                          Phone Number
                        </label>
                        <Input
                          id="number"
                          placeholder={vacation.userPhoneNumber}
                          readOnly
                          className="focus-visible:ring-0 focus-visible:border-gray-400/60 transition-all outline-none"
                        />
                      </div>
                      {vacation.somethingToSay && (
                        <div className="space-y-0.5">
                          <label
                            htmlFor="add"
                            className="text-sm font-medium text-gray-800">
                            Additional Information
                          </label>
                          <Input
                            id="add"
                            placeholder={vacation.somethingToSay}
                            readOnly
                            className="focus-visible:ring-0 focus-visible:border-gray-400/60 transition-all outline-none"
                          />
                        </div>
                      )}
                    </DialogDescription>
                  </DialogContent>
                </Dialog>

                {user?.picture ? (
                  <Image
                    src={user?.picture}
                    alt="user image"
                    width={29}
                    height={29}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-[29px] h-[29px] text-white flex items-center justify-center text-xs font-normal rounded-full bg-primary">
                    {getInitials(user?.name)}
                  </div>
                )}
                {user?.name}
              </TableCell>
              <TableCell>{vacation.duration} days</TableCell>
              <TableCell className="font-medium">{type?.typeName}</TableCell>
              <TableCell>
                {user.isOnVacation ? (
                  <>
                    {vacation.startDate.toLocaleDateString()} -{" "}
                    {vacation.endDate.toLocaleDateString()}
                  </>
                ) : (
                  <>N/A</>
                )}
              </TableCell>
              <DenyApprove
                vacationId={JSON.parse(JSON.stringify(vacation._id))}
                status={vacation.status}
                vacationUserId={JSON.parse(JSON.stringify(user._id))}
              />
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  ) : (
    <h3 className="text-gray-900 font-semibold text-2xl text-center pt-12">
      No vacations applied yet.
    </h3>
  );
};

export default AdminDashboard;
