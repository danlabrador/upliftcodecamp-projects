import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpenCheck, ChevronRight } from 'lucide-react';
import { Assessment } from '@/models/Assessment';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ImagesRecordProperty } from './ImagesRecordProperty';
import { TextRecordProperty } from './TextRecordProperty';

interface AssessmentsSectionProps extends React.PropsWithChildren {
  assessments: Assessment[];
}
export const AssessmentsSection = ({ assessments }: AssessmentsSectionProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-3">
        <BookOpenCheck className="mt-1.5" />
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
              const scheduledAt = new Date(assessmentDateTime);
              const stringDate = scheduledAt.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
              const stringTime = scheduledAt.toLocaleTimeString(undefined, { hour: 'numeric', minute: '2-digit', hour12: true });
              const stringDateTime = `${stringDate} at ${stringTime}`;
              const location = assessment.location.title;
              const screenshots = assessment.screenshots?.map((screenshot, screenshotIdx) => {
                return {
                  src: screenshot,
                  alt: `Screenshot ${idx}-${screenshotIdx}`
                };
              });

              return (
                <TableRow key={assessment.id}>
                  <TableCell>{assessment.title}</TableCell>
                  <TableCell>{stringDate}</TableCell>
                  <TableCell>{stringTime}</TableCell>
                  <TableCell>{location}</TableCell>
                  {assessment.score ? <TableCell className='min-w-[115px]'>{score}</TableCell> : <TableCell>
                      <div className='bg-sky-200 px-2 py-1 rounded-md inline-block'>
                        Not taken
                      </div>
                    </TableCell>}
                  {assessment.score ? <TableCell>
                    <Sheet>
                      <SheetTrigger asChild>
                        <ChevronRight />
                      </SheetTrigger>
                      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-scroll">
                        <SheetHeader className='mb-6'>
                          <SheetTitle>
                            <span className='text-gray-400 text-sm block'>{assessment.label}</span>
                            {assessment.title}
                          </SheetTitle>
                        </SheetHeader>
                        <div className='space-y-6'>
                          <TextRecordProperty property='Score' value={score} />
                          <TextRecordProperty property='Date and time taken' value={stringDateTime} />
                          <TextRecordProperty property='Location' value={location} />
                          {assessment.evaluatorsNotes && <TextRecordProperty property="Evaluator's notes" value={assessment.evaluatorsNotes} />}
                          {screenshots && <ImagesRecordProperty property='Screenshots' images={screenshots} />}
                          <span className='text-gray-500 text-sm block'>If you think we made a mistake, please reach out to your life group leader.</span>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </TableCell> : <TableCell />}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
