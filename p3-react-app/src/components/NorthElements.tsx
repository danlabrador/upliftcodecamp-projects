import { useSelector } from 'react-redux';
import { BreadcrumbsProps, Breadcrumbs } from './Breadcrumbs';
import { RootState } from '@/services/state/store';

const NorthElements = ({ breadcrumbs }: BreadcrumbsProps) => {
  const displayPictureSrc = useSelector((state: RootState) => state?.user?.data?.picture as string);
  return (
    <div className="flex justify-between mb-4">
      <Breadcrumbs breadcrumbs={breadcrumbs} />
      <img
        className="rounded-full h-[40px] w-[40px]"
        src={displayPictureSrc}
        alt="display picture"
      />
    </div>
  );
};

export default NorthElements;
