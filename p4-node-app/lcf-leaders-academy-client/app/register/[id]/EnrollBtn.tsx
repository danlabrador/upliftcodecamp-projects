"use client";
import { auth } from "@/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EnrollBtn({
  session,
  id,
}: {
  session: any;
  id: string;
}) {
  const router = useRouter();

  const handleEnroll = async () => {
    if (
      !session ||
      !session.accessToken ||
      !session.body ||
      !session.body.user
    ) {
      return;
    }
    const userResp = await fetch(
      `http://localhost:3100/api/1.0/users/email/${session.body.user.email}`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
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
            Authorization: `Bearer ${session.accessToken}`,
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
      router.push(`/register/`);
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
