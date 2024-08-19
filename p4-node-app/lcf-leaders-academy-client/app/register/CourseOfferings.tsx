import { auth } from "@/auth";
import { translateCronExpression } from "@/util/cronParser";
import Link from "next/link";

const CourseOfferings = async () => {
  const session = await auth();
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

  const courseOfferingsResp = await fetch(
    "http://localhost:3100/api/1.0/courseOfferings",
    {
      headers: {
        Authorization: `Bearer ${serverSession.accessToken}`,
      },
    }
  );
  const courseOfferings = await courseOfferingsResp.json();

  return (
    <table className="table m-10 max-w-[1000px]">
      <thead>
        <th>Code</th>
        <th>Title</th>
        <th>Schedule</th>
        <th>Description</th>
        <th>Credits</th>
      </thead>
      <tbody>
        {courseOfferings.map((courseOffering: any) => (
          <tr>
            <td>{courseOffering.courseCodeDetails.code}</td>
            <td className="text-blue-700 underline">
              <Link href={"/register/" + courseOffering._id}>
                {courseOffering.courseDetails.name}
              </Link>
            </td>
            <td>
              {courseOffering.classSchedules.map((cron: string) => {
                return translateCronExpression(
                  cron.split(" ").slice(0, -2).join(" ")
                );
              })}
            </td>
            <td>{courseOffering.courseDetails.description}</td>
            <td>{courseOffering.courseDetails.credits}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CourseOfferings;
