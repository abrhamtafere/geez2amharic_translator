// src/store/translationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async thunk for handling the translation
export const translateText = createAsyncThunk(
  'translation/translate',
  async (text) => {
    // Placeholder for actual translation logic or API call
    // Replace this with your actual API call logic
    const response = await fetch(`https://your-api-url.com/translate?text=${text}`);
    const data = await response.json();
    return data.translatedText;
  }
);

const translationSlice = createSlice({
  name: 'translation',
  initialState: {
    text: '',
    showSidebar: '-left-64',
  },
  reducers: {
    setText: (state, action) => {
      state.text = action.payload;
    },
    setShowSidebar: state => {
      state.showSidebar = state.showSidebar === "left-0" ? "-left-64" : "left-0"
    }
  },
});

export const { setText, setShowSidebar } = translationSlice.actions;

export default translationSlice.reducer;
