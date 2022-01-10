import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loadUser = createAsyncThunk("user/loadUser", async () => {
  try {
    const { data } = await axios.get("http://localhost:5000/api/v1/user/me");
    return data;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (userdata) => {
    try {
      
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/user/login`,
        userdata,
        config
      );
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
        `http://localhost:5000/api/v1/user/register`,
        userdata,
        config
      );
      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const logoutUser = createAsyncThunk("user/logoutUser", async () => {
  try {
    const { data } = await axios.post(
      "http://localhost:5000/api/v1/user/logout"
    );
    return data;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const updateUser = createAsyncThunk(
  "user/updateUser",
  async (userdata) => {
    try {
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/user/me`,
        userdata,
        config
      );
      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const deleteUser = createAsyncThunk("user/deleteUser", async () => {
  try {
    const { data } = await axios.delete("http://localhost:5000/api/v1/user/me");
    return data;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const forgotPasswordUser = createAsyncThunk(
  "user/forgotPasswordUser",
  async (email) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        `http://localhost:5000/api/v1/user/forgot/password`,
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
  async (token, passwords) => {
    try {
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/user/reset/password/${token}`,
        passwords,
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

  reducers: {},
  extraReducers: {
    [loadUser.pending]: (state, action) => {
      state.loading = true;
    },
    [loadUser.fulfilled]: (state, action) => {
      console.log(action);
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
    },
    [loadUser.rejected]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },

    [loginUser.pending]: (state, action) => {
      state.loading = true;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
    },
    [loginUser.rejected]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
      state.user = null;
    },

    [registerUser.pending]: (state, action) => {
      state.loading = true;
    },
    [registerUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.error = null;
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
      state.isUpdated = action.payload.success;
      state.message = action.payload.message;
    },
    [updateUser.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isUpdated = false;
    },

    [deleteUser.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.isDeleted = action.payload.success;
      state.message = action.payload.message;
    },
    [deleteUser.rejected]: (state, action) => {
      state.loading = false;
      state.isDeleted = false;
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

export default userSlice.reducer;
