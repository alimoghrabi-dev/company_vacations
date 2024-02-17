"use client";

import { Check, X } from "lucide-react";
import { TableCell } from "./ui/table";
import { useRouter } from "next/navigation";
import { useToast } from "./ui/use-toast";
import { cn } from "@/lib/utils";

const DenyApprove = ({
  vacationId,
  status,
  vacationUserId,
}: {
  vacationId: string;
  status: string;
  vacationUserId: string;
}) => {
  const router = useRouter();

  const { toast } = useToast();

  const handleDecline = async () => {
    try {
      const response = await fetch("/api/decline", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vacationId }),
      });

      if (response.ok) {
        toast({
          title: "You've declined this vacation.",
        });
      }

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  const handleApprove = async () => {
    try {
      const response = await fetch("/api/approve", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ vacationId, vacationUserId }),
      });

      if (response.ok) {
        toast({
          title: "You've approved this vacation.",
        });
      }

      router.refresh();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TableCell className="flex items-center justify-end mr-7 gap-x-0.5">
      {status === "Pending" ? (
        <>
          <X
            onClick={handleDecline}
            size={26}
            className="text-red-500 hover:text-red-400 transition cursor-pointer"
          />
          <span className="font-medium text-lg">/</span>
          <Check
            onClick={handleApprove}
            size={26}
            className="text-green-500 hover:text-green-400 transition cursor-pointer"
          />
        </>
      ) : (
        <p
          className={cn(
            "text-right",
            status === "Approved"
              ? "text-green-500 font-medium"
              : status === "Declined" && "text-red-500 font-medium"
          )}>
          {status}
        </p>
      )}
    </TableCell>
  );
};

export default DenyApprove;
