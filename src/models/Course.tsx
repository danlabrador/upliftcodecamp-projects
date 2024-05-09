export type Course = {
  id: number;
  title: string;
  description: string;
  price: number;
  isEnrolled: boolean;
  isArchived: boolean;
  isAvailable: boolean;
  pointsEarned: number;
  pointsTotal: number;
  createdAt: string;
  updatedAt: string;
  enrolledBy: number; // User ID
  bannerImage?: {
    url: string;
    alt: string;
  };
  prerequisiteCourses: number[]; // Course IDs
  units: {
    unitsFinished: number;
    unitsTotal: number;
    assessments: number[]; // Unit IDs
  };
};
