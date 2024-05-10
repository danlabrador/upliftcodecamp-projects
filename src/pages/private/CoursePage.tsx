import { PortalContentWithAside } from '@/components/PortalContentWithAside';
import { useLoadCourse } from '../../hooks/useLoadCourse';
import PortalContainer from '@/components/PortalContainer';
import { CardWall } from '../../components/CardWall';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLoadAssessments } from '@/hooks/useLoadAssessments';
import { BookOpenCheck, ChevronRight } from 'lucide-react';
import { Assessment } from '@/models/Assessment';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface ImagesRecordPropertyProps extends React.PropsWithChildren {
  property: string;
  images: {
    src: string;
    alt: string;
  }[];
}

const ImagesRecordProperty = ({ property, images }: ImagesRecordPropertyProps) => {
  return (
    <div className="flex flex-col gap-1 mb-6">
      <p className="text-gray-500 text-sm">{property}</p>
      <div className='flex flex-wrap gap-2'>
      {images.map((image, idx) => (
        <img 
          key={`screenshot-${idx}`} 
          src={image.src} 
          alt={image.alt} 
          className="w-full h-auto rounded-md border border-gray-200"
        />
      ))}
      </div>
    </div>
  );
};

interface TextRecordPropertyProps extends React.PropsWithChildren {
  property: string;
  value: string;
}

const TextRecordProperty = ({ property, value }: TextRecordPropertyProps) => {
  return (
    <div className="flex flex-col gap-1 mb-6">
      <p className="text-gray-500 text-sm">{property}</p>
      <p className="text-black text-base">{value}</p>
    </div>
  );
};

interface AssessmentsSectionProps extends React.PropsWithChildren {
  assessments: Assessment[];
}

const AssessmentsSection = ({ assessments }:AssessmentsSectionProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3">
        <BookOpenCheck className="mt-1.5"/>
        <CardTitle>Assessments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Score</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assessments.map((assessment, idx) => {
              const score = `${assessment.score}/${assessment.maxScore}`;
              const assessmentDateTime = assessment.scheduledAt as string;
              const scheduledAt = new Date(assessmentDateTime)
              const stringDate = scheduledAt.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
              const stringTime = scheduledAt.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', hour12: true });
              const stringDateTime = `${stringDate} at ${stringTime}`;
              const location = assessment.location.title
              const screenshots = assessment.screenshots?.map((screenshot, screenshotIdx) => {
                return {
                  src: screenshot,
                  alt: `Screenshot ${idx}-${screenshotIdx}`
                }
              })

              return (
                <TableRow key={assessment.id}>
                  <TableCell>{assessment.title}</TableCell>
                  <TableCell>{stringDate}</TableCell>
                  <TableCell>{stringTime}</TableCell>
                  <TableCell>{location}</TableCell>
                  {assessment.score && <TableCell>{score}</TableCell>}
                  {!assessment.score && <TableCell>Upcoming</TableCell>}
                  {assessment.score && <TableCell>
                    <Sheet>
                      <SheetTrigger asChild>
                        <ChevronRight />
                      </SheetTrigger>
                      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-scroll">
                        <SheetHeader>
                          <span className='text-gray-400 text-sm'>{assessment.label}</span>
                          <SheetTitle>{assessment.title}</SheetTitle>
                          <SheetDescription>
                            <TextRecordProperty property='Score' value={score} />
                            <TextRecordProperty property='Date and time taken' value={stringDateTime} />
                            <TextRecordProperty property='Location' value={location} />
                            {assessment.evaluatorsNotes && <TextRecordProperty property="Evaluator's notes" value={assessment.evaluatorsNotes} />}
                            {screenshots && <ImagesRecordProperty property='Screenshots' images={screenshots} />}
                            <span>If you think we made a mistake, please reach out to your life group leader.</span>
                          </SheetDescription>
                        </SheetHeader>
                      </SheetContent>
                    </Sheet>
                  </TableCell>}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};


const CoursePage = () => {
  const { course, courseId } = useLoadCourse();
  const { assessments } = useLoadAssessments();
  const breadcrumbs = [
    { text: 'Dashboard', to: '/dashboard' },
    { text: 'Courses', to: '/courses' },
    { text: `${course?.title}` },
  ];

  return (
    <PortalContainer breadcrumbs={breadcrumbs}>
      {course && <CardWall course={course} />}
      <PortalContentWithAside>
      <AssessmentsSection assessments={assessments.data} />
      </PortalContentWithAside>
    </PortalContainer>
  );
};

export default CoursePage;
