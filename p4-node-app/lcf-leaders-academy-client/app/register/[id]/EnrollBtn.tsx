"use client";
import { auth } from "@/auth";
import { Session } from "next-auth";
import { useEffect, useState } from "react";

export default function EnrollBtn({
  session,
  id,
}: {
  session: any;
  id: string;
}) {
  const [localSession, setLocalSession] = useState<any>(null);

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
        setLocalSession(serverSession);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [session]);

  const handleEnroll = async () => {
    if (
      !localSession ||
      !localSession.accessToken ||
      !localSession.body ||
      !localSession.body.user
    ) {
      return;
    }
    const userResp = await fetch(
      `http://localhost:3100/api/1.0/users/email/${localSession.body.user.email}`,
      {
        headers: {
          Authorization: `Bearer ${localSession.accessToken}`,
        },
      }
    );
    const user = await userResp.json();
    console.log(id);
    try {
      const enrollResp = await fetch(
        "http://localhost:3100/api/1.0/enrollments",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localSession.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            courseOfferingID: id,
            studentID: user._id,
          }),
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
}

export async function getServerSideProps(ctx: any) {
  const session = await auth(ctx);

  return {
    props: {
      session,
    },
  };
}
