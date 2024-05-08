import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Course } from '../../../models/Course';
import { loadCoursesAsync, updateCoursePointsAsync } from './coursesThunks';
import { UpdateCoursePointsPayloadActionStatus } from './coursesThunks';

// MARK: State
type CoursesState = {
  data: Course[];
  isLoading: boolean;
  error: string | null;
};

const initialState: CoursesState = {
  data: [],
  isLoading: false,
  error: null,
};

// MARK: Slice
const coursesSlice = createSlice({
  name: 'courses',
  initialState: initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(loadCoursesAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loadCoursesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(updateCoursePointsAsync.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        updateCoursePointsAsync.fulfilled,
        (state, action: PayloadAction<Course, string, UpdateCoursePointsPayloadActionStatus>) => {
          state.isLoading = false;
          const updatedCourse = action.payload;
          const courseIndex = state.data.findIndex(course => course.id === updatedCourse.id);
          state.data[courseIndex] = updatedCourse;
        }
      );
  },
});

export default coursesSlice.reducer;
