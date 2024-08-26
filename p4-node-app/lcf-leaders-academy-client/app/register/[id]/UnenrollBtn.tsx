"use client";
import { auth } from "@/auth";
import { useRouter } from "next/navigation";

export default function UnenrollBtn({
  session,
  enrollment,
}: {
  session: any;
  enrollment: any;
}) {
  const router = useRouter();

  const handleUnenroll = async () => {
    if (!session || !session.accessToken) {
      return;
    }
    try {
      const enrollResp = await fetch(
        `http://localhost:3100/api/1.0/enrollments/${enrollment._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!enrollResp.ok) {
        throw new Error("Failed to unenroll");
      }
      router.push(`/register/`);
    } catch (error) {
      console.error("Error enrolling:", error);
    }
  };
  return (
    <button className="btn btn-error" onClick={handleUnenroll}>
      Unenroll
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
