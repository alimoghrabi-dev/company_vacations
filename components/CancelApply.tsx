"use client";

import { Ban, Loader2 } from "lucide-react";
import { TableCell } from "./ui/table";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useToast } from "./ui/use-toast";

const CancelApply = ({ vacationId }: { vacationId: string }) => {
  const router = useRouter();
  const { toast } = useToast();

  const [isCanceling, setIsCanceling] = useState<boolean>(false);

  const handleCancelApply = async () => {
    setIsCanceling(true);

    try {
      const response = await fetch("/api/apply", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          vacationId,
        }),
      });

      if (response.ok) {
        toast({
          title: "Vacation Canceled.",
          description: "Your vacation has been canceled.",
        });

        router.refresh();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsCanceling(false);
    }
  };

  return (
    <TableCell>
      {isCanceling ? (
        <Loader2 className="animate-spin w-4 h-4 text-red-400" />
      ) : (
        <Ban
          onClick={handleCancelApply}
          size={24}
          className="text-red-500 cursor-pointer hover:text-red-400 transition"
        />
      )}
    </TableCell>
  );
};

export default CancelApply;
