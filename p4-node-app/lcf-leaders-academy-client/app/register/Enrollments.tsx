"use client";
import { translateCronExpression } from "@/util/cronParser";
import Link from "next/link";
import { useEffect, useState } from "react";

type Enrollment = any;

export default function Enrollments({ session }: { session: any }) {
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const serverSessionResp = await fetch(
          "http://localhost:3100/api/1.0/auth/login",
          {
            body: session.value,
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          }
        );
        const serverSession = await serverSessionResp.json();

        const userResp = await fetch(
          `http://localhost:3100/api/1.0/users/email/${serverSession.body.user.email}`,
          {
            headers: {
              Authorization: `Bearer ${serverSession.accessToken}`,
            },
          }
        );
        const user = await userResp.json();

        console.log(user);

        const enrollmentsResp = await fetch(
          `http://localhost:3100/api/1.0/users/${
            user?._id || "me"
          }/enrollments`,
          {
            headers: {
              Authorization: `Bearer ${serverSession.accessToken}`,
            },
          }
        );
        const enrollments = await enrollmentsResp.json();
        setEnrollments(enrollments);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [session]);

  return (
    <table className="table m-10 max-w-[1000px]">
      <thead>
        <tr>
          <th>Code</th>
          <th>Title</th>
          <th>Schedule</th>
          <th>Description</th>
          <th>Credits</th>
        </tr>
      </thead>
      <tbody>
        {enrollments.map((enrollment) => (
          <tr key={enrollment._id}>
            <td>{enrollment.courseCode.code}</td>
            <td className="text-blue-700 underline">
              <Link href={"/register/" + enrollment.courseOffering._id}>
                {enrollment.course.name}
              </Link>
            </td>
            <td>
              {enrollment.courseOffering.classSchedules.map((cron: string) => {
                return translateCronExpression(
                  cron.split(" ").slice(0, -2).join(" ")
                );
              })}
            </td>
            <td>{enrollment.course.description}</td>
            <td>{enrollment.course.credits}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
