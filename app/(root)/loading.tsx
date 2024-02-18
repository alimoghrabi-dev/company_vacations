import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="w-full flex flex-col gap-y-1.5 items-center justify-center mt-52">
      <Loader2 size={40} className="text-primary/75 animate-spin" />
      <h2 className="text-gray-800 font-semibold text-xl">
        Company Vacs is loading...
      </h2>
    </div>
  );
};

export default Loading;
