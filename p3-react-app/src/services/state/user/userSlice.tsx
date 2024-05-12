import { createSlice } from '@reduxjs/toolkit';
import { User } from '../../../models/User';

// MARK: State
type UserState = {
  data: User | null;
  isLoading: false;
  error: null;
  isLoggedIn: boolean;
};

const initialState: UserState = {
  data: null,
  isLoading: false,
  error: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      state.data = action.payload;
      state.isLoggedIn = true;
    },
    clearUser: state => {
      state.data = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
