import { auth } from "@/auth";
import { useEffect, useState } from "react";

export const EnrollBtn = () => {
  const [session, setSession] = useState(null);
  const [serverSession, setServerSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await auth();
      setSession(session);
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
      setServerSession(serverSession);
    };
    fetchSession();
  }, []);

  const handleEnroll = async () => {
    const userResp = await fetch(
      `http://localhost:3100/api/1.0/users/email/${session.user.email}`,
      {
        headers: {
          Authorization: `Bearer ${serverSession.accessToken}`,
        },
      }
    );
    const user = await userResp.json();
    try {
      const enrollResp = await fetch(
        "http://localhost:3100/api/1.0/enrollments",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${serverSession.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ courseOfferingID: id, studentID: user._id }),
        }
      );

      if (!enrollResp.ok) {
        throw new Error("Failed to enroll");
      }

      const enrollData = await enrollResp.json();
      console.log("Enrollment successful:", enrollData);
    } catch (error) {
      console.error("Error enrolling:", error);
    }
  };
  return (
    <button className="btn btn-primary" onClick={handleEnroll}>
      Enroll
    </button>
  );
};

export async function getServerSideProps(ctx: any) {
  const session = await auth(ctx);

  return {
    props: {
      session,
    },
  };
}
