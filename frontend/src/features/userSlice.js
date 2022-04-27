import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../url"

export const loadUser = createAsyncThunk(
  "user/loadUser",
  async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const { data } = await axios.get(
        `${API_URL}/user/me`,
        config
      );
      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userdata) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `${API_URL}/user/login`,
        userdata,
        config
      );
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (userdata) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.post(
        `${API_URL}/user/register`,
        userdata,
        config
      );
      localStorage.setItem("token", data.token);
      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const { data } = await axios.get(`${API_URL}/user/logout`, config);

      localStorage.removeItem("token");
      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userdata) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: token,
        },
      };
      const { data } = await axios.put(`${API_URL}/user/me`, userdata, config);

      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const { data } = await axios.delete(`${API_URL}/user/me`, config);
      localStorage.removeItem("token");
      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const forgotPasswordUser = createAsyncThunk(
  "user/forgotPasswordUser",
  async (email) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `${API_URL}/user/forgot/password`,
        email,
        config
      );
      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const resetPasswordUser = createAsyncThunk(
  "user/resetPasswordUser",
  async (userData) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `${API_URL}/user/reset/password/${userData.token}`,
        userData.myForm,
        config
      );
      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState: {
    loading: true,
    isAuthenticated: false,
    user: null,
    error: null,
    message: null,
    isUpdated: false,
    isDeleted: false,
  },

  reducers: {
    clearUserErrors: (state) => {
      state.error = null;
    },
    clearUserMessage: (state) => {
      state.message = null
    }
  },
  extraReducers: {
    [loadUser.pending]: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    [loadUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    [loadUser.rejected]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },

    [loginUser.pending]: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
      state.user = null;
    },

    [registerUser.pending]: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    [registerUser.rejected]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },

    [logoutUser.pending]: (state, action) => {
      state.loading = true;
    },
    [logoutUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.message = action.payload.message;
    },
    [logoutUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [updateUser.pending]: (state, action) => {
      state.loading = true;
    },
    [updateUser.fulfilled]: (state, action) => {
      state.loading = false;
      // state.isAuthenticated = true;
      // state.user = action.payload.user;
      state.isUpdated = action.payload.success;
      state.message = action.payload.message;
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      // state.isAuthenticated = false;
      // state.user = null;
      state.error = action.payload;
      // state.isUpdated = false;
    },

    [deleteUser.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.isDeleted = action.payload.success;
      state.message = action.payload.message;
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      // state.isDeleted = false;
      state.error = action.payload;
    },

    [forgotPasswordUser.pending]: (state, action) => {
      state.loading = true;
    },
    [forgotPasswordUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    [forgotPasswordUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [resetPasswordUser.pending]: (state, action) => {
      state.loading = true;
    },
    [resetPasswordUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    [resetPasswordUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { clearUserErrors, clearUserMessage } = userSlice.actions;

export default userSlice.reducer;
