import Link from "next/link";
import { auth } from "@/auth";

export const NavBar = async () => {
  const session = await auth();

  return (
    <nav className="bg-white py-8 flex flex-col items-center">
      <ul className="flex gap-4 max-w-[1000px] w-full justify-end">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
        {session && (
          <li>
            <Link href="/api/auth/signout">Log Out</Link>
          </li>
        )}
        {!session && (
          <li>
            <Link href="/api/auth/signin">Log In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
