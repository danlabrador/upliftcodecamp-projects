import NorthElements from '@/components/NorthElements';
import { BreadcrumbInfo } from './Breadcrumbs';

interface PortalContainerProps extends React.PropsWithChildren {
  breadcrumbs: BreadcrumbInfo[];
}

const PortalContainer = ({ children, breadcrumbs }: PortalContainerProps) => {
  return (
    <div className="w-full">
      <NorthElements breadcrumbs={breadcrumbs} />
      {children}
    </div>
  );
};

export default PortalContainer;
