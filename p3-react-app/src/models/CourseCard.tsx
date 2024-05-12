export interface CourseCard extends React.PropsWithChildren {
  id: number;
  title: string;
  description: string;
  bannerImage: {
    url: string;
    alt: string;
  };
  progressNum: number;
}
