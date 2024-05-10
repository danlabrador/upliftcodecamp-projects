import { Course } from '../../../models/Course';

export const courseSol1: Course = {
  id: 20000000001,
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
      url: 'https://cdn.discordapp.com/attachments/1019424511378067467/1238414061171900418/sol1-icon.png?ex=663f3278&is=663de0f8&hm=a0bfda4571570c263a41872ee2d0a782c4b1477ca9d78f42f6f715bee5faa76c&',
      alt: 'School of Leaders 1',
    },
    card: {
      url: 'https://cdn.discordapp.com/attachments/1019424511378067467/1238085209266720940/sol1.jpg?ex=663e0034&is=663caeb4&hm=c24411b76a324d0944ac1e0642e24da5decf75e1359f76c85c9145396f02b720&',
      alt: 'School of Leaders 1',
    },
    banner: {
      url: 'https://cdn.discordapp.com/attachments/1019424511378067467/1238111020891902082/cynthia-magana-GMLNhaBkCiE-unsplash.jpg?ex=663ec0fe&is=663d6f7e&hm=219e19439718927f87a50f38a30108b1f338bbb0c2961edd7d31b14e68a50d37&',
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
      url: 'https://cdn.discordapp.com/attachments/1019424511378067467/1238414060928765973/sol2-icon.png?ex=663f3278&is=663de0f8&hm=4c9a864a18a2c3dcc2175b9da71f57af91ec316132146f868a807451e72c7315&',
      alt: 'School of Leaders 2 icon',
    },
    card: {
      url: 'https://cdn.discordapp.com/attachments/1019424511378067467/1238063802298273913/sol2.jpg?ex=663dec44&is=663c9ac4&hm=1af21e1cfa73c218a16030f560e91064af60dda8f819139f1c24005f79a10fc7&',
      alt: 'School of Leaders 2 card image',
    },
    banner: {
      url: 'https://cdn.discordapp.com/attachments/1019424511378067467/1238110597661331526/matheus-ferrero-TkrRvwxjb_8-unsplash.jpg?ex=663ec099&is=663d6f19&hm=a17e35e2f6529690f9506a2a927ac9c70dff6394b3646b290b22aaab886bdd99&',
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
