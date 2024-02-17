"use client";

import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "./ui/button";

const DashboardLink = () => {
  const pathname = usePathname();

  return pathname === "/dashboard" ? (
    <Link
      href="/apply"
      className={buttonVariants({
        className:
          "text-gray-50 text-[13px] font-medium transition mr-2 bg-gray-900 rounded-xl hover:bg-gray-800",
        size: "sm",
      })}>
      Apply for a Vacation
    </Link>
  ) : (
    <Link
      href="/dashboard"
      className="text-gray-900 text-base font-medium mr-2 flex items-center gap-x-1 hover:text-gray-700 transition">
      Dashboard <MoveUpRight size={19} />
    </Link>
  );
};

export default DashboardLink;
