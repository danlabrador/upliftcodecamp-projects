import { createSlice } from '@reduxjs/toolkit';
import { Record } from '../../../models/Record';

// MARK: State
type RecordState = {
  record: Record | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: RecordState = {
  record: null,
  isLoading: false,
  error: null,
};

// MARK: Slice
const recordSlice = createSlice({
  name: 'record',
  initialState: initialState,
  reducers: {
    setRecord: (state, action) => {
      state.record = action.payload;
    },
    clearRecord: state => {
      state.record = null;
    },
  },
});

export const { setRecord, clearRecord } = recordSlice.actions;
export default recordSlice.reducer;
