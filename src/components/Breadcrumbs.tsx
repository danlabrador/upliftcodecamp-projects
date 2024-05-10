import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from './ui/breadcrumb';
import { Fragment } from 'react';

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
        {breadcrumbs.map((breadcrumb, idx) => (
          <Fragment key={`breadcrumb-fragment-${idx}`}>
            <BreadcrumbItem key={`breadcrumb-item-${idx}`}>
              {breadcrumb.to && <BreadcrumbLink to={breadcrumb.to}>{breadcrumb.text}</BreadcrumbLink>}
              {!breadcrumb.to && <BreadcrumbPage>{breadcrumb.text}</BreadcrumbPage>}
            </BreadcrumbItem>
            {breadcrumb.to && <BreadcrumbSeparator key={`breadcrumb-separator-${idx}`}/>}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
