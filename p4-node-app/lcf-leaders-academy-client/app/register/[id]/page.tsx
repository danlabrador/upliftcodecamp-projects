import { auth } from "@/auth";
import { EnrollBtn } from "./EnrollBtn";

interface CoursePageProps {
  params: {
    id: string;
  };
}

const CoursePage = async ({ params: { id } }: CoursePageProps) => {
  const session = (await auth()) as { user: { email: string } };
  const serverSessionResp = await fetch(
    "http://localhost:3100/api/1.0/auth/login",
    {
      body: JSON.stringify(session),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      next: { revalidate: 20 },
    }
  );
  const serverSession = await serverSessionResp.json();
  const courseResp = await fetch(
    "http://localhost:3100/api/1.0/courseOfferings/" + id,
    {
      headers: {
        Authorization: `Bearer ${serverSession.accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );
  const course = await courseResp.json();

  return (
    <main>
      <section className="flex bg-indigo-950 flex-col items-center">
        <h1 className="text-white mt-4 max-w-[1000px] w-full text-4xl font-bold">
          {course.courseDetails.name}
        </h1>
        <p className="text-white w-full max-w-[1000px] mb-4 text-xl">
          Course Details
        </p>
      </section>
      <section className="p-4 rounded-lg flex flex-col items-center gap-4">
        <p className="text-lg font-semibold w-full max-w-[1000px]">
          Description:{" "}
          <span className="font-normal">
            {course.courseDetails.description}
          </span>
        </p>
        <p className="text-lg font-semibold w-full max-w-[1000px]">
          Location:{" "}
          <span className="font-normal">{course.location.addressLineOne}</span>
        </p>
        <p className="text-lg font-semibold w-full max-w-[1000px]">
          Credits:{" "}
          <span className="font-normal">{course.courseDetails.credits}</span>
        </p>
        <p className="text-lg font-semibold w-full max-w-[1000px]">
          Price: ₱<span className="font-normal">{course.price}</span>
        </p>

        {/* <EnrollBtn session={session} serverSession={serverSession} id={id} /> */}
      </section>
    </main>
  );
};

export default CoursePage;
