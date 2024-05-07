import { ERecordType } from '@/models/ERecordType';

export type Record = {
  id: number;
  title: string;
  type: ERecordType;
  [key: string]: unknown;
};
