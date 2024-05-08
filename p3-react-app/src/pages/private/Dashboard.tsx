import { Announcement } from '../../components/Announcement';
import { PortalContentWithAside } from '../../components/PortalContentWithAside';
import NotificationImage from '../../assets/images/private/notification-image.svg';
import PortalContainer from '@/components/PortalContainer';

const Dashboard = () => {
  const breadcrumbs = [{ text: 'Dashboard' }];

  return (
    <PortalContainer breadcrumbs={breadcrumbs}>
      <PortalContentWithAside>
        <Announcement
          title="Training on How to Start a Life Group"
          description="A life group helps a church become more authentic in its relationships and become far more committed in spiritual disciplines. Pursue authentic spiritual family relationships."
          imageSrc={NotificationImage}
        />
      </PortalContentWithAside>
    </PortalContainer>
  );
};

export default Dashboard;
