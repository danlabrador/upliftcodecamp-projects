export const EnrollBtn = ({
  serverSession,
  session,
  id,
}: {
  serverSession: { accessToken: string };
  session: { user: { email: string } } | null;
  id: string;
}) => {
  const handleEnroll = async () => {
    const userResp = await fetch(
      `http://localhost:3100/api/1.0/users/email/${
        session?.user?.email || "me"
      }`,
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
