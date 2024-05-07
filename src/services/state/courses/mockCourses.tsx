import { Course } from '../../../models/Course';

export const courseSol2: Course = {
  id: 20000000002,
  title: 'School of Leaders 2',
  description:
    'School of Leaders 2 prepares potential leaders for carrying out the work of God by presenting Bible-based lessons about winning and consolidation.',
  price: 300,
  isEnrolled: true,
  isArchived: false,
  isAvailable: true,
  pointsEarned: 81,
  pointsTotal: 230,
  createdAt: new Date('2024-04-07T05:34:08Z'),
  updatedAt: new Date('2024-04-28T11:03:14Z'),
  enrolledBy: 10000000001,
  prerequisiteCourses: [20000000002],
  units: {
    unitsFinished: 3,
    unitsTotal: 7,
    assessments: [60000000001, 60000000002, 60000000003],
  },
};
