import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {

  const { data: session, status } = useSession();

  useEffect(() => {
    console.log(session);
  }, [session]);
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>Hello world!</h1>
        <h1>{status}</h1>

        <button onClick={() => signIn()}>Login</button>
        <button onClick={() => signOut()}>Logout</button>
      </main>
    </div>
  );
}
