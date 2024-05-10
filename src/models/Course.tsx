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
  startsAt: string;
  endsAt: string;
  enrolledBy: number; // User ID
  images?: {
    icon?: {
      url: string;
      alt: string;
    };
    card?: {
      url: string;
      alt: string;
    };
    banner?: {
      url: string;
      alt: string;
    };
  };
  prerequisiteCourses: number[]; // Course IDs
  units: {
    unitsFinished: number;
    unitsTotal: number;
    assessments: number[]; // Unit IDs
  };
};
