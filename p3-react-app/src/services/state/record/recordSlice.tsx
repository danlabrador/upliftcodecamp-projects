import { createSlice } from '@reduxjs/toolkit';
import { Record } from '../../../models/Record';

// MARK: State
type RecordState = {
  data: Record | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: RecordState = {
  data: null,
  isLoading: false,
  error: null,
};

// MARK: Slice
const recordSlice = createSlice({
  name: 'record',
  initialState: initialState,
  reducers: {
    setRecord: (state, action) => {
      state.data = action.payload;
    },
    clearRecord: state => {
      state.data = null;
    },
  },
});

export const { setRecord, clearRecord } = recordSlice.actions;
export default recordSlice.reducer;
