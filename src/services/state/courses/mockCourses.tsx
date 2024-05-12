import { Course } from '../../../models/Course';
import sol1Icon from '../../../assets/images/private/sol1-icon.png';
import sol1Card from '../../../assets/images/private/sol1-card.jpg';
import sol1Banner from '../../../assets/images/private/sol1-banner.jpg';
import sol2Icon from '../../../assets/images/private/sol2-icon.png';
import sol2Card from '../../../assets/images/private/sol2-card.jpg';
import sol2Banner from '../../../assets/images/private/sol2-banner.jpg';

export const courseSol1: Course = {
  id: 20000000001,
  abbreviation: 'SOL 1',
  title: 'School of Leaders 1',
  description:
    'The main objective of this level of training is to train the leader in the vision of growth–the cellular vision. In this level, the leader learns the structure and development of a cell, and the process of raising a team of leaders out of a cell group. This training also equips the leader in intercession, evangelism, and service.',
  price: 250,
  isEnrolled: true,
  isArchived: true,
  isAvailable: true,
  pointsEarned: 222,
  pointsTotal: 230,
  createdAt: new Date('2023-09-12T05:34:08Z').toISOString(),
  updatedAt: new Date('2023-10-28T11:03:14Z').toISOString(),
  startsAt: new Date('2023-09-17T08:00:00Z').toISOString(),
  endsAt: new Date('2023-10-29T20:00:00Z').toISOString(),
  enrolledBy: 10000000001,
  images: {
    icon: {
      url: sol1Icon,
      alt: 'School of Leaders 1',
    },
    card: {
      url: sol1Card,
      alt: 'School of Leaders 1',
    },
    banner: {
      url: sol1Banner,
      alt: 'School of Leaders 1',
    }
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
  abbreviation: 'SOL 2',
  title: 'School of Leaders 2',
  description:
    'The main objective of this level of training is not to provide a wealth of information, but to form efficient leaders founded on the basics of salvation, prayer, baptism, faith, and the Holy Spirit. The lessons for this level are “…not designed for the students to become theologians, rather for them to have an effective tool to make disciples and to implement the vision.” (Castellanos, 2007)',
  price: 300,
  isEnrolled: true,
  isArchived: false,
  isAvailable: true,
  pointsEarned: 81,
  pointsTotal: 230,
  createdAt: new Date('2024-04-07T05:34:08Z').toISOString(),
  updatedAt: new Date('2024-04-28T11:03:14Z').toISOString(),
  startsAt: new Date('2024-04-07T08:00:00Z').toISOString(),
  endsAt: new Date('2024-05-19T20:00:00Z').toISOString(),
  enrolledBy: 10000000001,
  images: {
    icon: {
      url: sol2Icon,
      alt: 'School of Leaders 2 icon',
    },
    card: {
      url: sol2Card,
      alt: 'School of Leaders 2 card image',
    },
    banner: {
      url: sol2Banner,
      alt: 'School of Leaders 2 banner',
    }
  },
  prerequisiteCourses: [20000000002],
  units: {
    unitsFinished: 3,
    unitsTotal: 7,
    assessments: [60000000001, 60000000002, 60000000003],
  },
};
