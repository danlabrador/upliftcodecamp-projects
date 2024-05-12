import { PortalContentWithAside } from '@/components/PortalContentWithAside';
import { useLoadCourse } from '../../hooks/useLoadCourse';
import PortalContainer from '@/components/PortalContainer';
import { CardWall } from '../../components/CardWall';
import { Card } from '@/components/ui/card';
import { useLoadAssessments } from '@/hooks/useLoadAssessments';
import { AssessmentsSection } from '../../components/AssessmentsSection';
import { Skeleton } from '@/components/ui/skeleton';

const CoursePage = () => {
  const { course, courseId, isCourseLoading } = useLoadCourse();
  const { assessments } = useLoadAssessments(Number(courseId));
  const breadcrumbs = [
    { text: 'Dashboard', to: '/dashboard' },
    { text: 'Courses', to: '/courses' },
    { text: `${course?.title}` },
  ];

  return (
    <PortalContainer breadcrumbs={breadcrumbs}>
      {isCourseLoading &&
        <Card className='flex flex-col md:flex-row mb-12 overflow-hidden w-full h-[350px]'>
          <div className='flex flex-col w-full h-full md:w-1/2 p-6 justify-between'>
            <Skeleton className='w-1/2 h-[30px]'/>
            <div className='space-y-2'>
              <Skeleton className='w-full h-[15px]'/>
              <Skeleton className='w-full h-[15px]'/>
              <Skeleton className='w-full h-[15px]'/>
              <Skeleton className='w-full h-[15px]'/>
              <Skeleton className='w-full h-[15px]'/>
              <Skeleton className='w-full h-[15px]'/>
              <Skeleton className='w-full h-[15px]'/>
              <Skeleton className='w-3/4 h-[15px]'/>
            </div>
            <div>
              <Skeleton className='w-full h-[15px]'/>
            </div>
          </div>
          <Skeleton className='flex-1 flex items-center border-l md:border-l-0 md:border-t border-gray-200 h-full xl:max-h-[350px]'/>
        </Card>
      }

      {!isCourseLoading && course && <CardWall course={course} />}
      <PortalContentWithAside>
        {assessments.isLoading &&
          <Card className='p-8 space-y-4'>
            <Skeleton className='w-1/2 h-[30px]'/>
            <div className='space-y-2'>
              <Skeleton className='w-full h-[15px]'/>
              <Skeleton className='w-full h-[15px]'/>
              <Skeleton className='w-full h-[15px]'/>
              <Skeleton className='w-full h-[15px]'/>
              <Skeleton className='w-full h-[15px]'/>
              <Skeleton className='w-full h-[15px]'/>
              <Skeleton className='w-full h-[15px]'/>
              <Skeleton className='w-full h-[15px]'/>
              <Skeleton className='w-full h-[15px]'/>
              <Skeleton className='w-full h-[15px]'/>
              <Skeleton className='w-1/3 h-[15px]'/>
            </div>
          </Card>}
        {!assessments.isLoading && assessments.data.length !== 0 && <AssessmentsSection assessments={assessments.data} />}
        {!assessments.isLoading && assessments.data.length === 0 && <Card className='p-8'>No records found. You must have completed this class before January 2024. If you think this is a mistake, please let your life group leader know.</Card>}
      </PortalContentWithAside>
    </PortalContainer>
  );
};

export default CoursePage;
