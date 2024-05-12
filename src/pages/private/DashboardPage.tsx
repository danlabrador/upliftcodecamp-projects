import { Announcement } from '../../components/Announcement';
import { PortalContentWithAside } from '../../components/PortalContentWithAside';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NotificationImage from '../../assets/images/private/notification-image.svg';
import PortalContainer from '@/components/PortalContainer';
import { CoursesTab } from '../../components/CoursesTab';
import { useSelector } from 'react-redux';
import { RootState } from '@/services/state/store';

const Dashboard = () => {
  const breadcrumbs = [{ text: 'Dashboard' }];
  const user = useSelector((state: RootState) => state.user);

  return (
    <PortalContainer breadcrumbs={breadcrumbs}>
      <PortalContentWithAside>
        <div className='space-y-4'>
          <h1 className='text-3xl font-semibold'>👋 Welcome, {user.data?.givenName}!</h1>
          <Announcement
            title="Leave Your Mark: Turning Your Work/Business into a Mission"
            description="Mark your calendar for another empowering and refreshing time with like-minded people. Bring your colleagues, business associates, and professional friends for an evening of encouraging talk, worship, and life-giving fellowship."
            link="https://www.facebook.com/lighthousedavao/posts/pfbid02Ve7PEPwtDistJTefh7w63T6t9En61dBFfHeci62VKqrCKe8ARD1R1zLLJfq5k3Gvl"
            imageSrc={NotificationImage}
          />
        </div>

        <Tabs defaultValue="current">
          <TabsList>
            <TabsTrigger value="current">Current</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          <CoursesTab isCurrentCourses={true} />
          <CoursesTab isCurrentCourses={false} />
        </Tabs>
      </PortalContentWithAside>
    </PortalContainer>
  );
};

export default Dashboard;
