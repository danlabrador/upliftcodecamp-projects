import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useCourseDetails } from '../hooks/useCourseDetails';
import defaultCourseImage from '@/assets/images/private/default-banner-image.jpg';
import { Course } from '@/models/Course';

interface CardWallProps extends React.PropsWithChildren {
  course: Course;
}
export const CardWall = ({ course }: CardWallProps) => {
  const {
    currentWeek, totalWeeks, passingPoints, progressNum, trueCurrentWeek
  } = useCourseDetails(course);

  return (
    <div className="flex flex-col md:flex-row mb-12 overflow-hidden w-full">
      <Card className="flex flex-1 flex-col justify-center items-center md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        <CardContent className="flex flex-col w-full h-full md:w-1/2 p-6 justify-between">
          <div className='mb-4'>
            <CardHeader className="px-3 py-0 mb-2 flex flex-row gap-2 items-center">
              <img className='h-10 w-10' src={course?.images?.icon?.url} alt={course?.images?.icon?.alt} />
              <CardTitle className="text-2xl">{course?.title}</CardTitle>
            </CardHeader>
            <CardDescription className="px-3 text-base">
              {course?.description}
            </CardDescription>
          </div>
          <div className="flex flex-col px-3 gap-2">
            <div className='flex flex-col sm:flex-row justify-between text-gray-500'>
              <p className="text-sm pb-1">
                {trueCurrentWeek > totalWeeks ? 'Done' : `Week ${currentWeek} of ${totalWeeks}`}
              </p>
              <p className="text-sm pb-1">
                {course?.pointsEarned} / {course?.pointsTotal} pts ({passingPoints} pts to pass)
              </p>
            </div>
            <Progress className="w-full h-3" value={progressNum} />
            <p className="font-medium text-right">{progressNum}% complete</p>
          </div>
        </CardContent>
        <div className="flex-1 flex items-center border-l md:border-l-0 md:border-t border-gray-200 h-full xl:max-h-[350px]">
          <img
            className="object-cover w-full h-full"
            src={course?.images?.banner?.url || defaultCourseImage}
            alt={course?.images?.banner?.alt || 'Default course banner image'} />
        </div>
      </Card>
    </div>
  );
};
