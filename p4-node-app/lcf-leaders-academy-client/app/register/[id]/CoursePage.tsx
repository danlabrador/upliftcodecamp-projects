import { EnrollBtn } from "./EnrollBtn";

interface CoursePageProps {
  course: any;
}

const CoursePage = ({ course }: CoursePageProps) => {
  return (
    <main>
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
          <span className="font-normal">{course.location.addressLineOne}</span>
        </p>
        <p className="text-lg font-semibold w-full max-w-[1000px]">
          Credits:{" "}
          <span className="font-normal">{course.courseDetails.credits}</span>
        </p>
        <p className="text-lg font-semibold w-full max-w-[1000px]">
          Price: ₱<span className="font-normal">{course.price}</span>
        </p>

        <EnrollBtn />
      </section>
    </main>
  );
};

export default CoursePage;
