import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CourseCard } from '../models/CourseCard';
import { Progress } from '@/components/ui/progress';
import DefaultBannerImage from '@/assets/images/private/default-banner-image.jpg';
import { clipCourseDescription } from '@/utils/strings';
import { Link } from 'react-router-dom';

export const TabbedCourseCard = ({
  id,
  title,
  description,
  bannerImage,
  progressNum,
}: CourseCard) => {
  if (!bannerImage.url) {
    bannerImage.url = DefaultBannerImage;
    bannerImage.alt = 'Default Banner Image';
  }

  const clippedDescription = clipCourseDescription(description, 160);

  return (
    <Link to={`/courses/${id}`}>
      <Card className="w-md-card p-2 space-y-3 hover:border-violet-400 hover:shadow-lg transition-all duration-200 ease-in-out">
        <img src={bannerImage.url} alt={bannerImage.alt} />
        <CardHeader className="px-3 py-0">
          <CardTitle className="text-lg">{title}</CardTitle>
        </CardHeader>
        <CardDescription className="px-3">
          {clippedDescription}
        </CardDescription>
        <div className="px-3 pb-3">
          <p className="font-medium pb-1">{progressNum}% complete</p>
          <Progress className="w-full h-3" value={progressNum} />
        </div>
      </Card>
    </Link>
  );
};
