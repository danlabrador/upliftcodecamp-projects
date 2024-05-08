import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../../models/User';

// MARK: State
type UserState = {
  data: User | null;
  isLoading: false;
  error: null;
};

const initialState: UserState = {
  data: null,
  isLoading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
    },
    clearUser: state => {
      state.data = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
