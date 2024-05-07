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
  createdAt: Date;
  updatedAt: Date;
  enrolledBy: number; // User ID
  prerequisiteCourses: number[]; // Course IDs
  units: {
    unitsFinished: number;
    unitsTotal: number;
    assessments: number[]; // Unit IDs
  };
};
