import { CoursesTab } from '@/components/CoursesTab';
import PortalContainer from '@/components/PortalContainer';
import { PortalContentWithAside } from '@/components/PortalContentWithAside';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CoursesPage = () => {
  const breadcrumbs = [{ text: 'Dashboard', to: '/dashboard' }, { text: `Courses` }];

  return (
    <PortalContainer breadcrumbs={breadcrumbs}>
      <PortalContentWithAside>
        <Tabs defaultValue="current">
          <TabsList>
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          <CoursesTab isCurrentCourses={true} />
          <CoursesTab isCurrentCourses={false} />
        </Tabs>
      </PortalContentWithAside>
    </PortalContainer>
  );
};

export default CoursesPage;
