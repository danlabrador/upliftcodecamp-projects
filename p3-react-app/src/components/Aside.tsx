import { Calendar } from '@/components/ui/calendar';
import { Progress } from '@/components/ui/progress';
import { useCourseDetails } from '@/hooks/useCourseDetails';
import { useLoadCourses } from '@/hooks/useLoadCourses';
import { Course } from '@/models/Course';
import { Link } from 'react-router-dom';

export const Aside = () => {
  const { courses } = useLoadCourses();
  
  // Mocked active course.
  const activeCourse = courses.data.find(course => course.id === 20000000002) as Course;
  const {
    currentWeek, totalWeeks, progressNum, trueCurrentWeek
  } = useCourseDetails(activeCourse);

  return (
    <aside className="hidden lg:flex flex-col items-start w-[275px]">
      <Link to='/courses/20000000002'>
        <p className="font-medium mb-2">
          {activeCourse && activeCourse.abbreviation} : {trueCurrentWeek > totalWeeks ? `We are already beyond Week ${totalWeeks}.` : `Week ${currentWeek} of ${totalWeeks}`}
        </p>
      </Link>
      <Progress className="w-full h-3 mb-6" value={progressNum} />

      <h2 className="font-bold mb-4">Upcoming Events</h2>
      <Calendar mode="single" selected={new Date()} className="inline-block rounded-md border" />
    </aside>
  );
};
