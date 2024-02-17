import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { buttonVariants } from "../ui/button";
import Image from "next/image";
import { getInitials } from "@/lib/utils";
import DashboardLink from "../DashboardLink";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogOutButton from "../LogOutButton";
import { UserSession } from "@/types/type";
import { Badge } from "../ui/badge";

const Navbar = async () => {
  const session: UserSession | null = await getServerSession(authOptions);

  return (
    <div className="fixed bg-white/75 backdrop-blur-sm top-0 w-full flex items-center justify-between border-b border-gray-300/50 py-4 px-2 sm:px-5 md:px-10 lg:px-12">
      <div className="relative">
        <Link href="/" className="text-primary font-bold text-xl md:text-2xl">
          Company Vacs
        </Link>
        {session?.user.isAdmin && (
          <Badge className="absolute top-0 ml-1 cursor-default hover:bg-primary">
            Admin
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-x-2">
        {session ? (
          <>
            <DashboardLink />
            <DropdownMenu>
              <DropdownMenuTrigger className="rounded-full outline-none">
                {session.user?.image ? (
                  <Image
                    src={session.user?.image}
                    alt="user image"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-[40px] h-[40px] text-white flex items-center justify-center text-sm font-normal rounded-full bg-primary">
                    {getInitials(session.user?.name)}
                  </div>
                )}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-transparent mr-4 p-0">
                <div className="bg-white/70 backdrop-blur-sm border px-2 border-gray-300 w-full flex flex-col items-start">
                  <DropdownMenuLabel className="text-center w-full pt-2.5">
                    {session.user?.name}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="w-full bg-gray-300 h-px mx-auto" />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="w-full hover:bg-primary/[0.125] transition cursor-pointer pl-3">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  {session.user?.isAdmin ? (
                    <DropdownMenuItem asChild>
                      <Link
                        href="/admin-dashboard"
                        className="text-primary w-full font-medium hover:bg-slate-200/90 hover:text-primary transition cursor-pointer pl-3">
                        Admin Dashboard
                      </Link>
                    </DropdownMenuItem>
                  ) : null}
                  <DropdownMenuSeparator className="w-full bg-gray-300 h-px mx-auto" />
                  <DropdownMenuItem asChild>
                    <LogOutButton />
                  </DropdownMenuItem>
                </div>
                {session.user.isAdmin && (
                  <div className="py-1 bg-primary/90 backdrop-blur-sm text-white text-[15px] font-medium rounded-b-full flex items-center justify-center">
                    Admin
                  </div>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className={buttonVariants({
                variant: "ghost",
                className: "text-sm hover:text-gray-700",
              })}>
              Login
            </Link>
            <Link
              href="/register"
              className={buttonVariants({
                className: "rounded-2xl text-sm",
              })}>
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
