import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  assessment1,
  assessment2,
  assessment3,
  assessment4,
  assessment5,
  assessment6,
  assessment7,
} from './mockAssessments';

// MARK: loadAssessment
export const loadAssessmentsAsync = createAsyncThunk('assessments/loadAssessments', async () => {
  //? Simulation: Call API to add course
  await new Promise(resolve => setTimeout(resolve, 1500));
  return [
    assessment1,
    assessment2,
    assessment3,
    assessment4,
    assessment5,
    assessment6,
    assessment7,
  ]; // Mock data
});
