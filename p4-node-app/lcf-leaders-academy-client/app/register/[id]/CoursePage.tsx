"use client";
import { useEffect, useState } from "react";
import EnrollBtn from "./EnrollBtn";
import UnenrollBtn from "./UnenrollBtn";

interface CoursePageProps {
  session: any;
  id: string;
}

const CoursePage = ({ session, id }: CoursePageProps) => {
  const [course, setCourse] = useState<any>(null);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrollment, setEnrollment] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const courseResp = await fetch(
        "http://localhost:3100/api/1.0/courseOfferings/" + id,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
            "Cache-Control": "no-cache",
          },
        }
      );
      const course = await courseResp.json();

      const userResp = await fetch(
        `http://localhost:3100/api/1.0/users/email/${session.body.user.email}`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Cache-Control": "no-cache",
          },
        }
      );
      const user = await userResp.json();

      const enrollmentsResp = await fetch(
        `http://localhost:3100/api/1.0/users/${user?._id || "me"}/enrollments`,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Cache-Control": "no-cache",
          },
        }
      );
      const enrollments = await enrollmentsResp.json();

      const enrollment = enrollments.find((enrollment: any) => {
        return enrollment.courseOffering._id === course._id;
      });

      const isEnrolled = enrollments.some((enrollment: any) => {
        return enrollment.courseOffering._id === course._id;
      });

      setCourse(course);
      setEnrollments(enrollments);
      setEnrollment(enrollment);
      setIsEnrolled(isEnrolled);
    })();
  }, []);

  return (
    <main>
      {course && (
        <>
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
              <span className="font-normal">
                {course.location.addressLineOne}
              </span>
            </p>
            <p className="text-lg font-semibold w-full max-w-[1000px]">
              Credits:{" "}
              <span className="font-normal">
                {course.courseDetails.credits}
              </span>
            </p>
            <p className="text-lg font-semibold w-full max-w-[1000px]">
              Price: ₱<span className="font-normal">{course.price}</span>
            </p>

            {!isEnrolled && <EnrollBtn session={session} id={course._id} />}

            {isEnrolled && (
              <UnenrollBtn session={session} enrollment={enrollment} />
            )}
          </section>
        </>
      )}
    </main>
  );
};

export default CoursePage;
