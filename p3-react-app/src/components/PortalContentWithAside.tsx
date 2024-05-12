import { Aside } from './Aside';

interface PortalContentProps extends React.PropsWithChildren {}
export const PortalContentWithAside = ({ children }: PortalContentProps) => {
  return (
    <div className="flex gap-16">
      <main className="flex flex-col gap-16 flex-grow">{children}</main>
      <Aside />
    </div>
  );
};
