"use client";

import { NewButton } from "@repo/ui/button";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

export default function AppBar() {
  const { data: session } = useSession();
  const userInitial = session?.user?.email?.charAt(1)?.toUpperCase() || "";

  return (
    <header className="w-full bg-gray-200 text-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="text-2xl font-bold tracking-wide text-gray-700">
          Bank
        </div>

        <div className="flex items-center space-x-4">
  
          {session && (
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-700 text-lg font-semibold">
              {userInitial}
            </div>
          )}

          {session ? (
            <NewButton label="Logout" onClick={signOut}  />
          ) : (
            <NewButton label="Signin" onClick={signIn}  />
          )}
        </div>
      </div>
    </header>
  );
}
