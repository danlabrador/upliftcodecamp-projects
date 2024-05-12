import { EUnitType } from '@/models/EUnitType';

export type Unit = {
  id: number;
  title: string;
  description: string;
  type: EUnitType;
  isFinished: boolean;
  createdAt: Date;
  updatedAt: Date;
  score: number;
  maxScore: number;
  courseId: number;
  studentId: number;
};
