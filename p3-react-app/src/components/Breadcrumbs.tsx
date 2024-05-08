import { Link } from 'react-router-dom';

export type BreadcrumbInfo = {
  text: string;
  link?: string;
};
export type BreadcrumbsProps = {
  breadcrumbs: BreadcrumbInfo[];
};
export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ breadcrumbs }) => {
  return (
    <nav className="flex items-center">
      {breadcrumbs.map((breadcrumb, index) => (
        <span key={index}>
          {breadcrumb.link ? <Link to={breadcrumb.link}>{breadcrumb.text}</Link> : breadcrumb.text}
          {index < breadcrumbs.length - 1 && ' / '}
        </span>
      ))}
    </nav>
  );
};
