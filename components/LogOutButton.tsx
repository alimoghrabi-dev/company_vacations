"use client";

import { Loader2, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import { useState } from "react";

const LogOutButton = () => {
  const [isSigningOut, setIsSigningOut] = useState<boolean>(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      await signOut();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <Button
      onClick={handleSignOut}
      className="w-full flex items-center gap-x-2"
      variant={"ghost"}>
      {isSigningOut ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          <LogOut size={18} />
          Logout
        </>
      )}
    </Button>
  );
};

export default LogOutButton;
