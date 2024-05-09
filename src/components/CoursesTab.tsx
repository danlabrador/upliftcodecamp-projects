import { Course } from '@/models/Course';
import { CourseCard } from '../models/CourseCard';
import { RootState } from '@/services/state/store';
import { TabbedCourseCard } from './TabbedCourseCard';
import { TabsContent } from '@/components/ui/tabs';
import { useSelector } from 'react-redux';
import React from 'react';

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
    bannerImage: course.bannerImage || { url: '', alt: '' },
    progressNum: Math.floor((course.units.unitsFinished / course.units.unitsTotal) * 100),
  }));

  const tabsContentValue = isCurrentCourses ? 'current' : 'past';

  return (
    <TabsContent className="w-md-card" value={tabsContentValue}>
      {courseCards.map((courseCard: CourseCard) => (
        <TabbedCourseCard {...courseCard} />
      ))}
    </TabsContent>
  );
};
