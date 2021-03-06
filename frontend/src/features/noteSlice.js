import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL } from "../url";

export const loadNotes = createAsyncThunk("note/loadNotes", async (search='') => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const { data } = await axios.get(
      `${API_URL}/note?search=${search}`,
      config
    );
    return data;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const loadNoteDetails = createAsyncThunk(
  "note/loadNoteDetails",
  async (id) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const { data } = await axios.get(`${API_URL}/note/${id}`, config);
      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const createNote = createAsyncThunk(
  "note/createNote",
  async (noteData) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: token,
        },
      };
      const { data } = await axios.post(`${API_URL}/note`, noteData, config);
      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const editNote = createAsyncThunk("note/editNote", async (noteData) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const { data } = await axios.put(
      `${API_URL}/note/${noteData.id}`,
      noteData.myForm,
      config
    );
    return data;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const deleteNote = createAsyncThunk("note/deleteNote", async (id) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const { data } = await axios.delete(`${API_URL}/note/${id}`, config);
    return data;
  } catch (error) {
    throw error.response.data.message;
  }
});

export const noteSlice = createSlice({
  name: "note",
  initialState: {
    loading: true,
    notes: [],
    note: {},
    error: null,
    message: null,
  },

  reducers: {
    clearNoteErrors: (state) => {
      state.error = null;
    },
    clearNoteMessage: (state) => {
      state.message = null
    }
  }, 

  extraReducers: {
    [loadNotes.pending]: (state, action) => {
      state.loading = true;
    },
    [loadNotes.fulfilled]: (state, action) => {
      state.loading = false;
      state.notes = action.payload.notes;
      state.error = null;
    },
    [loadNotes.rejected]: (state, action) => {
      state.loading = false;
      state.notes = [];
      state.error = action.payload;
    },

    [loadNoteDetails.pending]: (state, action) => {
      state.loading = true;
      state.note = null
    },
    [loadNoteDetails.fulfilled]: (state, action) => {
      state.loading = false;
      state.note = action.payload.note;
      state.error = null;
    },
    [loadNoteDetails.rejected]: (state, action) => {
      state.loadig = false;
      state.note = null;
      state.error = action.payload;
    },

    [createNote.pending]: (state, action) => {
      state.loading = true;
    },
    [createNote.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.error = null;
    },
    [createNote.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [editNote.pending]: (state, action) => {
      state.loading = true;
    },
    [editNote.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.error = null;
    },
    [editNote.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [deleteNote.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteNote.fulfilled]: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.error = null;
    },
    [deleteNote.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { clearNoteErrors, clearNoteMessage } = noteSlice.actions;

export default noteSlice.reducer;
