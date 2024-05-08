import { configureStore } from '@reduxjs/toolkit';
import coursesReducer from './courses/coursesSlice';
import assessmentsReducer from './assessments/assessmentsSlice';
import recordReducer from './record/recordSlice';
import userReducer from './user/userSlice';

export const store = configureStore({
  reducer: {
    courses: coursesReducer,
    assessments: assessmentsReducer,
    record: recordReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
