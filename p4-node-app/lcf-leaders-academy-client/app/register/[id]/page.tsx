import { auth } from "@/auth";
import CoursePage from "./CoursePage";

const Page = async ({ params: { id } }: { params: { id: string } }) => {
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

  return <CoursePage course={course} />;
};

export default Page;
