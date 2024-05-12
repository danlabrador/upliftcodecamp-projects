import { Course } from '@/models/Course';
import { CourseCard } from '../models/CourseCard';
import { RootState } from '@/services/state/store';
import { TabbedCourseCard } from './TabbedCourseCard';
import { TabsContent } from '@/components/ui/tabs';
import { useSelector } from 'react-redux';
import React from 'react';
import { Skeleton } from './ui/skeleton';
import { Card } from './ui/card';

export interface CoursesTab extends React.PropsWithChildren {
  isCurrentCourses: boolean;
}
export const CoursesTab = ({ isCurrentCourses }: CoursesTab) => {
  const courses = useSelector((state: RootState) => state.courses);
  const filteredCourses = courses.data.filter(
    (course: Course) => course.isArchived === !isCurrentCourses
  );
  const courseCards = filteredCourses.map((course: Course) => ({
    id: course.id,
    title: course.title,
    description: course.description,
    bannerImage: course.images?.card || { url: '', alt: '' },
    progressNum: Math.floor((course.units.unitsFinished / course.units.unitsTotal) * 100),
  }));

  const tabsContentValue = isCurrentCourses ? 'current' : 'past';

  return (
    <TabsContent className="w-full flex gap-4 flex-wrap" value={tabsContentValue}>
      {courses.isLoading &&
        <>
          <Card className="p-2 space-y-3 w-md-card">
            <Skeleton className='w-[300px] h-[200px]'/>
            <div className='p-2 space-y-3'>
              <Skeleton className='w-2/3 h-[30px]'/>
              <Skeleton className='w-full h-[15px]'/>
              <Skeleton className='w-full h-[15px]'/>
              <Skeleton className='w-full h-[15px]'/>
              <Skeleton className='w-3/4 h-[15px]'/>
            </div>
          </Card>
          <Card className="p-2 space-y-3 w-md-card">
            <Skeleton className='w-[300px] h-[200px]'/>
            <div className='p-2 space-y-3'>
              <Skeleton className='w-2/3 h-[30px]'/>
              <Skeleton className='w-full h-[15px]'/>
              <Skeleton className='w-full h-[15px]'/>
              <Skeleton className='w-full h-[15px]'/>
              <Skeleton className='w-3/4 h-[15px]'/>
            </div>
          </Card>
          <Card className="p-2 space-y-3 w-md-card">
            <Skeleton className='w-[300px] h-[200px]'/>
            <div className='p-2 space-y-3'>
              <Skeleton className='w-2/3 h-[30px]'/>
              <Skeleton className='w-full h-[15px]'/>
              <Skeleton className='w-full h-[15px]'/>
              <Skeleton className='w-full h-[15px]'/>
              <Skeleton className='w-3/4 h-[15px]'/>
            </div>
          </Card>
        </>
      }

      {!courses.isLoading && courseCards.map((courseCard: CourseCard, idx:number) => (
        <TabbedCourseCard key={`tabbed-course-card-${idx}`} {...courseCard} />
      ))}
    </TabsContent>
  );
};
