import PortalContainer from '@/components/PortalContainer';
import { useLoadCourse } from '../../hooks/useLoadCourse';

const CoursePage = () => {
  const { course } = useLoadCourse();

  const breadcrumbs = [
    { text: 'Dashboard', to: '/dashboard' },
    { text: 'Courses', to: '/courses' },
    { text: `${course?.title}` },
  ];

  return <PortalContainer breadcrumbs={breadcrumbs}></PortalContainer>;
};

export default CoursePage;
