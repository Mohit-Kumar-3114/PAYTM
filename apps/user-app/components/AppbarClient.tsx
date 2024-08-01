"use client"
import { signOut } from "next-auth/react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";

export function AppbarClient() {
  const router = useRouter();

  return (
   <div>
      <Appbar onSignout={async () => {
        await signOut({redirect:false})
        router.push("api/auth/signin")
      }} />
   </div>
  );
}
