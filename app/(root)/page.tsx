import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <div className="w-full flex flex-col gap-y-3 items-center justify-center pt-10 pb-2">
      <h2 className="text-2xl sm:text-3xl font-bold text-primary text-center">
        Welcome to Company Vacs
      </h2>
      <p className="text-sm sm:text-base font-medium text-gray-600 max-w-2xl text-center">
        Streamlined Vacation Management. Our platform simplifies vacation
        requests for employees and ensures efficient approval for
        administrators.
      </p>
      <Link href="/apply" className={buttonVariants({ className: "mt-1.5" })}>
        Apply for a Vacation
      </Link>
      <Image
        src="/hero.jpg"
        alt="hero"
        width={400}
        height={372}
        className="mt-6 w-[340px] sm:w-[400px] h-[312px] sm:h-[372px] object-contain"
      />
    </div>
  );
};

export default Home;
