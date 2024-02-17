import RegisterForm from "@/components/auth/RegisterForm";
import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

const Register = async () => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
  }

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex">
        <div className="flex flex-col gap-y-10 py-5 px-8 border border-r-0 rounded-l-xl border-primary/30">
          <h1 className="text-gray-900 text-4xl font-semibold text-center">
            Join our Community
          </h1>
          <RegisterForm />
        </div>
        <div className="register_background py-2 px-8 rounded-r-xl flex flex-col gap-y-5 items-center justify-center">
          <h2 className="text-gray-50 font-semibold text-xl">
            Already Registered?
          </h2>
          <Link
            href="/login"
            className="bg-white px-6 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
