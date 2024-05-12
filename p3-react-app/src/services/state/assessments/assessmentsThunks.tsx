import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  sol2Assessment1,
  sol2Assessment2,
  sol2Assessment3,
  sol2Assessment4,
  sol2Assessment5,
  sol2Assessment6,
  sol2Assessment7,
} from './mockAssessments';

// MARK: loadAssessment
export const loadAssessmentsAsync = createAsyncThunk('assessments/loadAssessments', async (courseId: number) => {
  //? Simulation: Call API to add course
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Reviewer's Note: This is a mock data. I will replace this with actual API call once API is ready.
  if (courseId === 20000000002) {
    return [
      sol2Assessment1,
      sol2Assessment2,
      sol2Assessment3,
      sol2Assessment4,
      sol2Assessment5,
      sol2Assessment6,
      sol2Assessment7,
    ]; // Mock data
  } else {
    return [];
  }
});
