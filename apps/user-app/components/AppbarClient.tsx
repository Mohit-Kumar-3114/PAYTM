"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect } from "react";
import { Appbar } from "@repo/ui/appbar";
import { useRouter } from "next/navigation";

export function AppbarClient() {
  const session = useSession();
  const router = useRouter();

  return (
   <div>
      <Appbar onSignin={signIn} onSignout={async () => {
        await signOut()
        useEffect(() => {
          if (!session.data) {
            router.push("/api/auth/signin");
          }
        }, [session]);
      
      }} user={session.data?.user} />
   </div>
  );
}
