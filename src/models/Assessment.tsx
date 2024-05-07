import { Room } from '@/models/Room';

export type Assessment = {
  id: number;
  title: string;
  label?: string;
  description?: string;
  maxScore: number;
  score?: number;
  location: Room;
  courseId: number;
  studentId: number;
  createdAt: Date;
  scheduledAt?: Date;
  submittedAt?: Date;
  updatedAt: Date;
  evaluatorsNotes?: string;
  screenshots?: string[]; // URLs
};
