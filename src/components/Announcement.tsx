import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type AnnouncementProps = {
  title: string;
  description: string;
  imageSrc: string;
};
export const Announcement = ({ title, description, imageSrc }: AnnouncementProps) => {
  return (
    <>
      <Card className="flex">
        <CardHeader className="flex flex-col justify-evenly">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          <Button className="w-40">Learn More</Button>
        </CardHeader>
        <CardContent className="flex items-end p-0 w-2/3 max-w-[300px]">
          <img src={imageSrc} alt="church" className="rounded-lg w-full" />
        </CardContent>
      </Card>
    </>
  );
};
