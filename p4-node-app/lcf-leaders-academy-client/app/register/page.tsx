import { auth } from "@/auth";
import Link from "next/link";
import { useEffect } from "react";
import CourseOfferings from "./CourseOfferings";
import Enrollments from "./Enrolled";

const RegisterPage = async () => {
  return (
    <main>
      <section className="flex bg-indigo-950 flex-col items-center">
        <h1 className="text-white mt-4 max-w-[1000px] w-full text-4xl font-bold">
          Registration
        </h1>
        <p className="text-white w-full max-w-[1000px] mb-4 text-xl">
          Lighthouse Leaders Academy
        </p>
      </section>
      <section className="flex flex-col items-center py-8">
        <h2 className="text-4xl font-bold w-full max-w-[1000px]">Enrolled</h2>
        <Enrollments />

        <h2 className="text-4xl font-bold w-full max-w-[1000px]">
          Class Offerings
        </h2>
        <CourseOfferings />
      </section>
    </main>
  );
};

export default RegisterPage;
