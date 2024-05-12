import { useLoadCourses } from '@/hooks/useLoadCourses';
import { RootState } from '@/services/state/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export const useLoadCourse = () => {
  const { courses } = useLoadCourses();
  const isCourseLoading = courses.isLoading as boolean;

  const { courseId } = useParams<{ courseId: string }>();
  const course = useSelector((state: RootState) => {
    if (courseId !== undefined) {
      return state.courses.data.find(course => course.id === parseInt(courseId));
    }
  });


  return { courseId, course, isCourseLoading };
};
