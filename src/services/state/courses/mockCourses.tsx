import { Course } from '../../../models/Course';

export const courseSol1: Course = {
  id: 20000000001,
  title: 'School of Leaders 1',
  description:
    'The main objective of this level of training is not to provide a wealth of information, but to form efficient leaders founded on the basics of salvation, prayer, baptism, faith, and the Holy Spirit.',
  price: 250,
  isEnrolled: true,
  isArchived: true,
  isAvailable: true,
  pointsEarned: 222,
  pointsTotal: 230,
  createdAt: new Date('2023-09-12T05:34:08Z').toISOString(),
  updatedAt: new Date('2023-10-28T11:03:14Z').toISOString(),
  enrolledBy: 10000000001,
  bannerImage: {
    url: 'https://cdn.discordapp.com/attachments/1019424511378067467/1238085209266720940/sol1.jpg?ex=663e0034&is=663caeb4&hm=c24411b76a324d0944ac1e0642e24da5decf75e1359f76c85c9145396f02b720&',
    alt: 'School of Leaders 2',
  },
  prerequisiteCourses: [],
  units: {
    unitsFinished: 7,
    unitsTotal: 7,
    assessments: [
      60000000001, 60000000002, 60000000003, 60000000004, 60000000005, 60000000006, 60000000007,
    ],
  },
};

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
  createdAt: new Date('2024-04-07T05:34:08Z').toISOString(),
  updatedAt: new Date('2024-04-28T11:03:14Z').toISOString(),
  enrolledBy: 10000000001,
  bannerImage: {
    url: 'https://cdn.discordapp.com/attachments/1019424511378067467/1238063802298273913/sol2.jpg?ex=663dec44&is=663c9ac4&hm=1af21e1cfa73c218a16030f560e91064af60dda8f819139f1c24005f79a10fc7&',
    alt: 'School of Leaders 2',
  },
  prerequisiteCourses: [20000000002],
  units: {
    unitsFinished: 3,
    unitsTotal: 7,
    assessments: [60000000001, 60000000002, 60000000003],
  },
};
