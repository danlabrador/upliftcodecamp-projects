import { Assessment } from '../../../models/Assessment';
import sampleSheetA from '../../../assets/images/private/sample-sheet-a.jpg';
import sampleSheetB from '../../../assets/images/private/sample-sheet-b.jpg';

export const sol2Assessment1: Assessment = {
  id: 40000000001,
  title: 'The Vision, Life Group',
  label: 'Quiz #1',
  description:
    'Students are assessed on their understanding of the vision and purpose of the life group.',
  maxScore: 30,
  score: 27,
  evaluatorsNotes: 'Kindly minimize erasures so we can read your answers better. Great job!',
  location: {
    id: 30000000001,
    title: 'Cinema 6',
    fullAddress: 'NCCC Victoria Plaza, J.P. Laurel Ave, Bajada, 8000 Davao City',
  },
  courseId: 20000000002,
  studentId: 10000000001,
  createdAt: new Date('2024-04-07T05:34:08Z').toISOString(),
  scheduledAt: new Date('2024-04-14T06:00:00Z').toISOString(),
  submittedAt: new Date('2024-04-14T08:03:14Z').toISOString(),
  updatedAt: new Date('2024-04-14T08:03:14Z').toISOString(),
  screenshots: [sampleSheetA, sampleSheetB]
};

export const sol2Assessment2: Assessment = {
  id: 40000000002,
  title: 'Preparing for a Life Group Meeting',
  label: 'Quiz #2',
  description:
    'Students are assessed on their understanding on how to prepare for a life group meeting.',
  maxScore: 30,
  score: 24,
  location: {
    id: 30000000001,
    title: 'Cinema 6',
    fullAddress: 'NCCC Victoria Plaza, J.P. Laurel Ave, Bajada, 8000 Davao City',
  },
  courseId: 20000000002,
  studentId: 10000000001,
  createdAt: new Date('2024-04-07T05:34:08Z').toISOString(),
  scheduledAt: new Date('2024-04-21T10:00:00Z').toISOString(),
  submittedAt: new Date('2024-04-21T12:14:32Z').toISOString(),
  updatedAt: new Date('2024-04-21T12:14:32Z').toISOString(),
  screenshots: [sampleSheetB]
};

export const sol2Assessment3: Assessment = {
  id: 40000000003,
  title: 'Structure and Methodology of Life Groups',
  label: 'Quiz #3',
  description: 'Students are assessed on their understanding on how life groups are structured.',
  maxScore: 30,
  score: 30,
  location: {
    id: 30000000001,
    title: 'Cinema 6',
    fullAddress: 'NCCC Victoria Plaza, J.P. Laurel Ave, Bajada, 8000 Davao City',
  },
  courseId: 20000000002,
  studentId: 10000000001,
  createdAt: new Date('2024-04-07T05:34:08Z').toISOString(),
  scheduledAt: new Date('2024-04-28T09:00:00Z').toISOString(),
  submittedAt: new Date('2024-04-28T11:03:14Z').toISOString(),
  updatedAt: new Date('2024-04-28T11:03:14Z').toISOString(),
  screenshots: [sampleSheetA]
};

export const sol2Assessment4: Assessment = {
  id: 40000000004,
  title: 'Strategy and Methodology of Life Groups',
  label: 'Quiz #4',
  description: 'Students are assessed on their understanding on how life groups are strategized.',
  maxScore: 30,
  location: {
    id: 30000000001,
    title: 'Cinema 6',
    fullAddress: 'NCCC Victoria Plaza, J.P. Laurel Ave, Bajada, 8000 Davao City',
  },
  courseId: 20000000002,
  studentId: 10000000001,
  createdAt: new Date('2024-04-07T05:34:08Z').toISOString(),
  scheduledAt: new Date('2024-05-05T05:45:00Z').toISOString(),
  updatedAt: new Date('2024-04-07T05:34:08Z').toISOString(),
};

export const sol2Assessment5: Assessment = {
  id: 40000000005,
  title: 'Choosing a Leadership Team',
  label: 'Quiz #5',
  description: 'Students are assessed on their understanding on how to choose a leadership team.',
  maxScore: 30,
  location: {
    id: 30000000001,
    title: 'Cinema 6',
    fullAddress: 'NCCC Victoria Plaza, J.P. Laurel Ave, Bajada, 8000 Davao City',
  },
  courseId: 20000000002,
  studentId: 10000000001,
  createdAt: new Date('2024-04-07T05:34:08Z').toISOString(),
  scheduledAt: new Date('2024-05-12T07:15:00Z').toISOString(),
  updatedAt: new Date('2024-04-07T05:34:08Z').toISOString(),
};

export const sol2Assessment6: Assessment = {
  id: 40000000006,
  title: 'Relationship Between Leaders and Disciples',
  label: 'Quiz #6',
  description:
    'Students are assessed on their understanding on the relationship between leaders and disciples.',
  maxScore: 30,
  location: {
    id: 30000000001,
    title: 'Cinema 6',
    fullAddress: 'NCCC Victoria Plaza, J.P. Laurel Ave, Bajada, 8000 Davao City',
  },
  courseId: 20000000002,
  studentId: 10000000001,
  createdAt: new Date('2024-04-07T05:34:08Z').toISOString(),
  scheduledAt: new Date('2024-05-19T10:00:00Z').toISOString(),
  updatedAt: new Date('2024-04-07T05:34:08Z').toISOString(),
};

export const sol2Assessment7: Assessment = {
  id: 40000000007,
  title: 'Summative Assessment',
  description: 'Students are assessed on their understanding of the entire course.',
  maxScore: 100,
  location: {
    id: 30000000001,
    title: 'Cinema 6',
    fullAddress: 'NCCC Victoria Plaza, J.P. Laurel Ave, Bajada, 8000 Davao City',
  },
  courseId: 20000000002,
  studentId: 10000000001,
  createdAt: new Date('2024-04-07T05:34:08Z').toISOString(),
  scheduledAt: new Date('2024-05-19T10:00:00Z').toISOString(),
  updatedAt: new Date('2024-04-07T05:34:08Z').toISOString(),
};
