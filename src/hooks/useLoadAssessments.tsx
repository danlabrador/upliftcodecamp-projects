import { loadAssessmentsAsync } from '@/services/state/assessments/assessmentsThunks';
import { AppDispatch, RootState } from '@/services/state/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

export const useLoadAssessments = (courseId: number) => {
  const dispatch = useDispatch<AppDispatch>();
  const assessments = useSelector((state: RootState) => state.assessments);

  useEffect(() => {
    dispatch(loadAssessmentsAsync(courseId));
  }, [dispatch]);

  return { assessments };
};
