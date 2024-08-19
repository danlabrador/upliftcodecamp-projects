import { auth } from "@/auth";
import { translateCronExpression } from "@/util/cronParser";

const Enrollments = async () => {
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

  const enrollmentsResp = await fetch(
    `http://localhost:3100/api/1.0/users/${
      serverSession?.user?.id || "me"
    }/enrollments`,
    {
      headers: {
        Authorization: `Bearer ${serverSession.accessToken}`,
      },
    }
  );
  const enrollments = await enrollmentsResp.json();
  console.log(enrollments);

  return (
    <table className="table m-10 max-w-[1000px]">
      <thead>
        <th>Code</th>
        <th>Title</th>
        <th>Schedule</th>
        <th>Description</th>
        <th>Credits</th>
      </thead>
      <tbody></tbody>
    </table>
  );
};

export default Enrollments;
