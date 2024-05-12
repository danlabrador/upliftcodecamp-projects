import { Course } from '@/models/Course';

export const useCourseDetails = (course: Course | undefined) => {
  // Calculate course progress
  let progressNum = 0;
  if (course && course.units) {
    progressNum = Math.floor((course.units.unitsFinished / course.units.unitsTotal) * 100);
  }

  // Calculate course duration
  let startDate: Date | null = null;
  let endDate: Date | null = null;
  let currentWeek = 0;
  let trueCurrentWeek = 0;
  let totalWeeks = 0;
  if (course) {
    startDate = new Date(course.startsAt);
    endDate = new Date(course.endsAt);
    totalWeeks = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24 * 7));
    currentWeek = Math.min(Math.floor((new Date().getTime() - startDate.getTime()) / (1000 * 3600 * 24 * 7)), totalWeeks);
    trueCurrentWeek = Math.floor((new Date().getTime() - startDate.getTime()) / (1000 * 3600 * 24 * 7));
  }

  // Get passing grade
  const passingPercentage = 70;
  const passingPoints = course?.pointsTotal ? Math.floor((passingPercentage / 100) * course.pointsTotal) : 0;

  return { progressNum, currentWeek, totalWeeks, passingPoints, trueCurrentWeek };
};
