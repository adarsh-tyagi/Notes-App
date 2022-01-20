import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const loadNotes = createAsyncThunk("note/loadNotes", async () => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const { data } = await axios.get(
      "http://localhost:5000/api/v1/note",
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
      const { data } = await axios.get(
        `http://localhost:5000/api/v1/note/${id}`,
        config
      );
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
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/note",
        noteData,
        config
      );
      return data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
);

export const editNote = createAsyncThunk("note/editNote", async (id) => {
  try {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: token,
      },
    };
    const { data } = await axios.put(
      `http://localhost:5000/api/v1/note/${id}`,
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
    const { data } = await axios.delete(
      `http://localhost:5000/api/v1/note/${id}`,
      config
    );
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
    note: null,
    error: null,
    message: null,
  },

  reducers: {
    clearErrors: (state) => {
      state.error = null;
    },
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

export const { clearErrors } = noteSlice.actions;

export default noteSlice.reducer;
