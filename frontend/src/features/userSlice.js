import { createSlice } from "@reduxjs/toolkit"


export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: true,
    isAuthenticated: false,
    user: {},
  },

  reducers: {
    login: (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.loading = false;
      state.user = {};
      state.isAuthenticated = false;
    },
  },
  
});

export const { login, logout } = userSlice.actions

export default userSlice.reducer