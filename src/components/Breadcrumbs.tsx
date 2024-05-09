import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';

export type BreadcrumbInfo = {
  text: string;
  to?: string;
};

export type BreadcrumbsProps = {
  breadcrumbs: BreadcrumbInfo[];
};

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map(breadcrumb => (
          <BreadcrumbItem>
            {breadcrumb.to && <BreadcrumbLink to={breadcrumb.to}>{breadcrumb.text}</BreadcrumbLink>}
            {!breadcrumb.to && <BreadcrumbPage>{breadcrumb.text}</BreadcrumbPage>}
            {breadcrumb.to && <BreadcrumbSeparator />}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
