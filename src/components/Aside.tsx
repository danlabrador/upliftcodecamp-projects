import { Calendar } from '@/components/ui/calendar';
import { Progress } from '@/components/ui/progress';
import { useLoadCourses } from '@/hooks/useLoadContent';

export const Aside = () => {
  const { progressNum } = useLoadCourses();
  return (
    <>
      <aside className="flex flex-col items-end w-[320px]">
        <p className="font-medium mb-2">
          SOL 2: Week <span className="font-bold">4</span> of 6
        </p>
        <Progress className="w-full h-3 mb-6" value={progressNum} />

        <h2 className="font-bold mb-2">Upcoming Events</h2>
        <Calendar mode="single" selected={new Date()} className="inline-block rounded-md border" />
      </aside>
    </>
  );
};
