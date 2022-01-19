import { configureStore } from "@reduxjs/toolkit";
import noteSlice from "../features/noteSlice";
import userSlice from "../features/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    note: noteSlice,
  },
});
