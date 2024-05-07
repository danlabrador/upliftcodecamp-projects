import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './courses/coursesSlice';
import assessmentsReducer from './assignments/assignmentsSlice';
import recordReducer from './record/recordSlice';

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    assessments: assessmentsReducer,
    record: recordReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
