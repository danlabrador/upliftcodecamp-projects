import { createAsyncThunk } from '@reduxjs/toolkit';
import { courseSol1, courseSol2 } from './mockCourses';
import { Course } from '../../../models/Course';

// MARK: loadCourses
export const loadCoursesAsync = createAsyncThunk('courses/loadCourses', async () => {
  //? Simulation: Call API to add course
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [courseSol1, courseSol2];
});

// MARK: updateCoursePoints
export const updateCoursePointsAsync = createAsyncThunk(
  'courses/updateCoursePoints',
  async (course: Course) => {
    //? Simulation: Call API to update course score
    await new Promise(resolve => setTimeout(resolve, 1000));
    return course;
  }
);
export type UpdateCoursePointsPayloadActionStatus = {
  arg: Course;
  requestId: string;
  requestStatus: 'fulfilled';
};
