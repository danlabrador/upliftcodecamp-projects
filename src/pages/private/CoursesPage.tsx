import PortalContainer from '@/components/PortalContainer';

const CoursesPage = () => {
  const breadcrumbs = [{ text: 'Dashboard', to: '/dashboard' }, { text: `Courses` }];

  return <PortalContainer breadcrumbs={breadcrumbs}></PortalContainer>;
};

export default CoursesPage;
