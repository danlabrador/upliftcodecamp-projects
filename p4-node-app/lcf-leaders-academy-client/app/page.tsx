import { auth } from "@/auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <main>
      <section className="flex bg-indigo-950 flex-col items-center">
        <h1 className="text-white mt-4 max-w-[1000px] w-full text-4xl">
          Hello, {session?.user?.name ?? "there"}!
        </h1>
        <p className="text-white w-full max-w-[1000px] mb-4 text-xl">
          Lighthouse Leaders Academy
        </p>
      </section>
      <section className="flex flex-col items-center py-8">
        <p className="w-full max-w-[1000px]">
          See{" "}
          <Link href="/register" className="text-blue-700 underline">
            class offerings
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
