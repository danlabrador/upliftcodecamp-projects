import { createSlice } from '@reduxjs/toolkit';
import { Assessment } from '../../../models/Assessment';
import { loadAssessmentsAsync } from './assignmentsThunks';

// MARK: State
type AssessmentState = {
  assignments: Assessment[];
  isLoading: boolean;
  error: string | null;
};

const initialState: AssessmentState = {
  assignments: [],
  isLoading: false,
  error: null,
};

// MARK: Slice
const coursesSlice = createSlice({
  name: 'assessments',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadAssessmentsAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadAssessmentsAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.assignments = action.payload;
      });
  },
});

export default coursesSlice.reducer;
