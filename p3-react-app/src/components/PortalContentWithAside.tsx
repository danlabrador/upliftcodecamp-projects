import { Aside } from './Aside';

interface PortalContentProps extends React.PropsWithChildren {}
export const PortalContentWithAside = ({ children }: PortalContentProps) => {
  return (
    <div className="flex gap-4">
      <main className="flex-grow">{children}</main>
      <Aside />
    </div>
  );
};
