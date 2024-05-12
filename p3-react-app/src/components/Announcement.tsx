import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

type AnnouncementProps = {
  title: string;
  description: string;
  imageSrc: string;
  link?: string;
};
export const Announcement = ({ title, description, imageSrc, link }: AnnouncementProps) => {
  return (
    <>
      <Card className="flex">
        <CardHeader className="flex flex-col justify-evenly">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
          {link && (
            <a target="_blank" href={link}>
              <Button className="w-40">Learn More</Button>
            </a>
          )}
        </CardHeader>
        <CardContent className="flex items-end p-0 w-2/3 max-w-[300px]">
          <img src={imageSrc} alt="church" className="rounded-lg w-full" />
        </CardContent>
      </Card>
    </>
  );
};
