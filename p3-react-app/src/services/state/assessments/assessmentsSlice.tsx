import { createSlice } from '@reduxjs/toolkit';
import { Assessment } from '../../../models/Assessment';
import { loadAssessmentsAsync } from './assessmentsThunks';

// MARK: State
type AssessmentState = {
  data: Assessment[];
  isLoading: boolean;
  error: string | null;
};

const initialState: AssessmentState = {
  data: [],
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
        state.data = action.payload;
      });
  },
});

export default coursesSlice.reducer;
